import soda from 'soda-js'
import pluralize from 'pluralize'
import { capitalize } from 'underscore.string'
import _ from 'lodash'
import uniq from 'lodash/uniq'
import { replacePropertyNameValue } from '../helpers'

const API_ROOT = 'https://data.sfgov.org/'

// Export constants
export const Endpoints = {
  METADATA: endpointMetadata,
  QUERY: endpointQuery,
  TABLEQUERY: endpointTableQuery,
  COUNT: endpointCount,
  MIGRATION: endpointApiMigration,
  COLPROPS: endpointColumnProperties
}

export const Transforms = {
  METADATA: transformMetadata,
  QUERY: transformQueryData,
  TABLEQUERY: transformTableQuery,
  COUNT: transformCount,
  MIGRATION: transformApiMigration,
  COLPROPS: transformColumnProperties
}

export const shouldRunColumnStats = (type, key) => {
  /*
   * below is a bit of a hack to get around the fact that some categorical fields are encoded as numbers on the portal
   * we don't want to run column stats against all numeric columns, so this allows us to control that, the regex below may need to be
   * tuned as is, it could create false positives. This is okay for now, something we can optimize later
  */
  let regex = /(year|day|date|month|district|yr|code)/g
  let isCategorical = regex.test(key)
  if (type === 'text' || (isCategorical && type === 'number')) {
    return true
  } else {
    return false
  }
}

// Construct URL based on chart options
// TODO - break into smaller functions

function constructQuery (state) {
  let columns = state.columnProps.columns
  let { selectedColumn, dateBy, groupBy, sumBy, filters } = state.query

  let columnType = columns[selectedColumn].type
  let isCategory = (columns[selectedColumn].categories)

  let consumerRoot = API_ROOT.split('/')[2]
  let consumer = new soda.Consumer(consumerRoot)
  let id = state.metadata.migrationId || state.metadata.id
  id = id.substring(0, id.length - 1)
  let query = consumer.query().withDataset(id)

  let dateAggregation = dateBy === 'month' ? 'date_trunc_ym' : 'date_trunc_y'
  let selectAsLabel = selectedColumn + ' as label'
  let orderBy = 'value desc'
  if (columnType === 'date') {
    selectAsLabel = dateAggregation + '(' + selectedColumn + ') as label'
    orderBy = 'label'
  } else if (columnType === 'number' && !isCategory) {
    orderBy = 'label'
  }

  if (groupBy) {
    orderBy = groupBy
    if (columns[groupBy].type === 'date') {
      groupBy = 'date_trunc_y(' + groupBy + ') as date_group_by'
      orderBy = 'date_group_by'
    }
    query.select(groupBy).group(orderBy)
  }

  let base = 'count(*) as value'
  let sumByQry = selectAsLabel + ', sum(' + sumBy + ') as value'

  if (sumBy) {
    query.select(sumByQry)
      .group('label')
      .order(orderBy)
      .where(sumBy + ' is not null')
  } else {
    query = query.select(base)
      .select(selectAsLabel)
      .group('label')
      .order(orderBy)
  }

  // Where (filter)
  if (columnType === 'date' || (columnType === 'number' && !isCategory)) query = query.where('label is not null')
  if (filters) {
    for (let key in filters) {
      let column = key !== 'checkboxes' ? columns[key] : {type: 'checkbox'}
      let filter = filters[key]

      if (column.type === 'date') {
        let start = filter.options.min.format('YYYY-MM-DD')
        let end = filter.options.max.format('YYYY-MM-DD')
        query.where(key + '>="' + start + '" and ' + key + '<="' + end + '"')
      } else if (column.categories && filter.options && filter.options.selected) {
        let enclose = '"'
        let joined = [].concat(filter.options.selected)
        let selectedCount = joined.length
        let blankIdx = joined.indexOf('blank')
        let queryNull = ''

        if (blankIdx > -1) {
          joined.splice(blankIdx, 1)
          queryNull = key + ' is null'
        }

        if (selectedCount > 1) {
          queryNull = queryNull !== '' ? queryNull + ' or ' : ''
          joined = joined.join(enclose + ' or ' + key + '=' + enclose)
          query.where(queryNull + key + '=' + enclose + joined + enclose)
        } else if (selectedCount === 1) {
          let whereString = queryNull !== '' ? queryNull : key + '=' + enclose + joined + enclose
          query.where(whereString)
        }
      } else if (column.type === 'checkbox' && filter.options && filter.options.selected) {
        let join = filter.options.join || 'or'
        let joined = filter.options.selected.join(' ' + join + ' ')
        query.where(joined)
      } else if (column.type === 'number' && !column.categories && filter.options && filter.options.currentRange) {
        let first = parseInt(filter.options.currentRange[0])
        let last = parseInt(filter.options.currentRange[1])
        query.where(key + '>=' + first + ' and ' + key + '<=' + last)
      }
    }
  }
  query = query.limit(9999999)
  return query.getURL()
}

// Endpoints
function endpoint500 () {
  return 'http://httpstat.us/500'
}

function endpointApiMigration (id) {
  return API_ROOT + `api/migrations/${id}.json`
}

function endpointMetadata (id) {
  return API_ROOT + `api/views/${id}.json`
}

function endpointCount (id) {
  return API_ROOT + `resource/${id}.json?$select=count(*)`
}

function endpointQuery (state) {
  return constructQuery(state)
}

function endpointTableQuery (state) {
  let consumerRoot = API_ROOT.split('/')[2]
  let consumer = new soda.Consumer(consumerRoot)
  let id = state.metadata.migrationId || state.metadata.id
  let table = state.metadata.table
  let page = table.tablePage || 0

  let query = consumer.query()
    .withDataset(id)
    .limit(1000)
    .offset(1000 * page)

  if (table.sorted && table.sorted.length > 0) {
    table.sorted.forEach((key) => {
      query.order(key + ' ' + state.metadata.columns[key].sortDir)
    })
  }

  return query.getURL()
}

function endpointColumnProperties (id, key) {
  let category = key + ' as category'
  if (key === 'category') {
    category = key
  }
  return API_ROOT + `resource/${id}.json?$select=${category},count(*)&$group=category&$order=category asc&$limit=50000`
}

// Transforms

function transformMetadata (json) {
  let metadata = {
    id: json['id'],
    name: json['name'],
    description: json['description'],
    type: json['viewType'],
    createdAt: json['createdAt'],
    rowsUpdatedAt: json['rowsUpdatedAt'],
    viewModifiedAt: json['viewLastModified'],
    licenseName: json.license.name || null,
    licenseLink: json.license.termsLink || null,
    publishingDepartment: json.metadata.custom_fields['Department Metrics']['Publishing Department'] || null,
    publishingFrequency: json.metadata.custom_fields['Publishing Details']['Publishing frequency'] || null,
    dataChangeFrequency: json.metadata.custom_fields['Publishing Details']['Data change frequency'] || null,
    notes: json.metadata.custom_fields['Detailed Descriptive']['Data notes'] || null,
    programLink: json.metadata.custom_fields['Detailed Descriptive']['Program link'] || null,
    rowLabel: json.metadata.rowLabel || 'Record',
    tags: json.tags || null,
    category: json['category'] || 'dataset',
    columns: {}
  }

  if (json.metadata.attachments) {
    metadata.attachments = json.metadata.attachments
  }

  for (let column of json.columns) {
    let typeCast = {
      'calendar_date': 'date',
      'currency': 'number',
      'money': 'number'
    }
    let type = typeCast[column['dataTypeName']] || column['dataTypeName']
    let format = column['dataTypeName']

    let col = {
      id: column['id'],
      key: column['fieldName'],
      name: column['name'].replace(/[_-]/g, ' '),
      description: column['description'] || '',
      type,
      format}

    if (column['cachedContents']) {
      col.non_null = column['cachedContents']['non_null'] || 0
      col.null = column['cachedContents']['null'] || 0
      col.count = col.non_null + col.null
      col.min = column['cachedContents']['smallest'] || null
      col.max = column['cachedContents']['largest'] || null
    }

    metadata.columns[column['fieldName']] = col
  }

  return metadata
}

function transformQueryDataLegacy (json, state) {
  let { query, metadata, columnProps } = state
  let { rowLabel } = metadata
  let { selectedColumn, groupBy, sumBy } = query
  let { columns } = columnProps
  let labels = ['x']
  let keys = []
  let data = []
  let nullText = 'Blank'
  let isCheckbox = columns[selectedColumn].type === 'checkbox'
  let keyIdx = groupBy || 'label'
  if (keyIdx !== 'label' && columns[keyIdx].type === 'date') keyIdx = 'date_group_by'

  rowLabel = !sumBy ? pluralize(rowLabel) : 'Sum of ' + columns[sumBy].name

  labels = labels.concat(isCheckbox ? rowLabel : json.map((row) => {
    return typeof row.label === 'undefined' ? nullText : (row.label === nullText ? 'False' : capitalize(row.label.toString()))
  }).filter((elem, index, array) => {
    return array.indexOf(elem) === index
  }))

  keys = keys.concat((!isCheckbox && !groupBy) ? rowLabel : json.map((row) => {
    return typeof row[keyIdx] === 'undefined' ? nullText : (row[keyIdx] === nullText ? 'False' : capitalize(row[keyIdx].toString()))
  }).filter((elem, index, array) => {
    return array.indexOf(elem) === index
  }))

  keys.forEach((key, index, array) => data.push([key].concat(Array.apply(null, new Array(labels.length - 1)).map(Number.prototype.valueOf, 0))))

  json.forEach((row) => {
    let label = isCheckbox ? rowLabel : (typeof row.label === 'undefined' ? nullText : (row.label === nullText ? 'False' : capitalize(row.label.toString())))
    let key = (!isCheckbox && !groupBy) ? rowLabel : (typeof row[keyIdx] === 'undefined' ? nullText : (row[keyIdx] === nullText ? 'False' : capitalize(row[keyIdx].toString())))
    data[keys.indexOf(key)][labels.indexOf(label)] = row.value
  })

  if (columns[selectedColumn].type === 'number' && !columns[selectedColumn].categories) {
    let counts = [].concat(data[0])
    let numbers = [].concat(labels)
    counts.shift()
    numbers.shift()

    let vector = numbers.map((number, idx, arr) => {
      let expand = []
      for (let i = 0; i < parseInt(counts[idx]); i++) {
        expand.push(parseInt(number))
      }
      return expand
    }).reduce((a, b) => {
      return a.concat(b)
    }, [])

    vector.sort((a, b) => {
      return a - b
    })

    let quantile = (p, vector) => {
      let idx = 1 + (vector.length - 1) * p
      let lo = Math.floor(idx)
      let hi = Math.ceil(idx)
      let h = idx - lo
      return (1 - h) * vector[lo] + h * vector[hi]
    }

    let freedmanDiaconis = (vector) => {
      let iqr = quantile(0.75, vector) - quantile(0.25, vector)
      return 2 * iqr * Math.pow(vector.length, -1 / 3)
    }

    let pretty = (x) => {
      let scale = Math.pow(10, Math.floor(Math.log(x / 10) / Math.LN10))
      let err = 10 / x * scale
      if (err <= 0.15) scale *= 10
      else if (err <= 0.35) scale *= 5
      else if (err <= 0.75) scale *= 2
      return scale * 10
    }

    let binSize = freedmanDiaconis(vector)
    if (binSize === 0) {
      let vector2 = vector.slice(vector.lastIndexOf(0))
      binSize = freedmanDiaconis(vector2)
    }
    binSize = pretty(binSize)
    let binNumbers = (values, binWidth, array = [], index = 0) => {
      if (index < values.length) {
        let bin = Math.floor(values[index] / binWidth)
        array[bin] = array[bin] ? array[bin] + 1 : 1
        binNumbers(values, binWidth, array, index + 1)
      }
      return array
    }

    let maxBins = Math.floor(vector[vector.length - 1] / binSize)
    let emptyBins = Array(maxBins).fill(0)
    let binFreq = binNumbers(vector, binSize, emptyBins)

    data[0] = ['Count of ' + rowLabel].concat(binFreq)
    labels = ['x'].concat(binFreq.map((d, idx) => {
      return binSize * idx + ' to ' + binSize * (idx + 1)
    }))
  }

  data = [labels].concat(data)
  return data
}

function reduceGroupedData (data, groupBy) {
  // collect unique labels
  let groupedData = uniq(data.map((obj) => {
    return obj['label']
  })).map((label) => {
    return {label: label}
  })

  // add columns to rows
  let i = 0
  let dataLength = data.length
  for (i; i < dataLength; i++) {
    let groupIdx = groupedData.findIndex((element, idx, array) => {
      return element['label'] === data[i]['label']
    })
    groupedData[groupIdx][data[i][groupBy]] = parseInt(data[i]['value'])
  }

  return groupedData
}

function transformQueryData (json, state) {
  let data
  if (!(json.length === 1)) {
    data = transformQueryDataLegacy(json, state)
  } else {
    data = [ ['x', json[0]['label']], [ 'Count of Nothing', json[0]['value'] ] ]
  }
  let { query } = state
  let groupKeys = []
  if (query.groupBy) {
    groupKeys = uniq(json.map((obj) => {
      return obj[query.groupBy]
    }))
    json = reduceGroupedData(json, query.groupBy)
  }
  json = replacePropertyNameValue(json, 'label', 'undefined', 'blank')
  return {
    query: {
      isFetching: false,
      data: data,
      originalData: json,
      groupKeys: groupKeys
    }
  }
}

function transformTableQuery (json) {
  return {
    table: {
      isFetching: false,
      data: json
    }
  }
}

function transformCount (json) {
  return {rowCount: json[0].count}
}

function transformApiMigration (json) {
  return {migrationId: json.nbeId}
}

function transformColumnProperties (json, state, params) {
  let maxRecord = parseInt(_.maxBy(json, function (o) { return parseInt(o.count) }).count)
  let checkFirst = maxRecord / state.metadata.rowCount
  let checkNumCategories = json.length / state.metadata.rowCount
  let transformed = {
    columns: {}
  }
  transformed.columns[params['key']] = {}
  if ((checkFirst <= 0.95 && checkFirst >= 0.05 && checkNumCategories <= 0.95) && maxRecord !== '1' && json.length !== 50000) {
    transformed.columns[params['key']].categories = json
    transformed.categoryColumns = [params['key']]
  } else if (maxRecord === 1) {
    transformed.columns[params['key']].unique = true
  }

  if (checkFirst === 1) {
    transformed.columns[params['key']].singleValue = true
  }

  return transformed
}
