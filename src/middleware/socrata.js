import soda from 'soda-js'
import uniq from 'lodash/uniq'
import difference from 'lodash/difference'
import { replacePropertyNameValue } from '../helpers'
import moment from 'moment'
import d3 from 'd3'
import { sumObj, sortObj } from '../helpers'

const API_ROOT = 'https://data.sfgov.org/'

// Export constants
export const Endpoints = {
  COLUMNS: endpointColumns,
  QUERY: endpointQuery,
  TABLEQUERY: endpointTableQuery,
  COUNT: endpointCount,
  MIGRATION: endpointApiMigration,
  COLPROPS: endpointColumnProperties,
  QUERYTEXTCATEGORIES: constructQueryTextCategories
}

export const Transforms = {
  COLUMNS: transformColumns,
  QUERY: transformQueryData,
  QUERYTEXTCATEGORIES: transformTextCategoryData,
  TABLEQUERY: transformTableQuery,
  COUNT: transformCount,
  MIGRATION: transformApiMigration,
  COLPROPS: transformColumnProperties
}

// Construct URL based on chart options
// TODO - break into smaller functions

function constructQueryTextCategories (state) {
  //console.log("****Constructing a column props****")
  //let query = selectedField
  let consumerRoot = API_ROOT.split('/')[2]
  let consumer = new soda.Consumer(consumerRoot)
  let id = state.metadata.dataId || state.metadata.id
  let query = consumer.query().withDataset(id)
  let base = ', count(*) as count'
  let selectAsLabel = state.fieldDetailsProps.selectedField + ' as category '+ base
  let orderBy = 'count desc'
  query.select(selectAsLabel)
      .group('category')
      .order(orderBy)
  query = query.limit(10)
  //console.log(query.getURL())
  //console.log("***")
  return query.getURL()
}

function constructQuery (state) {

  let columns = state.columnProps.columns
  let { selectedColumn, dateBy, groupBy, sumBy, filters } = state.query

  let columnType = columns[selectedColumn].type
  let isCategory = (columns[selectedColumn].categories)

  let consumerRoot = API_ROOT.split('/')[2]
  let consumer = new soda.Consumer(consumerRoot)
  let id = state.metadata.dataId || state.metadata.id
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
  if (columnType === 'date') query = query.where('label is not null')
  if (filters) {
    for (let key in filters) {
      let column = key !== 'booleans' ? columns[key] : {type: 'boolean'}
      let filter = filters[key]

      if (filter.options && column.type === 'date') {
        let start = moment(filter.options.min).format('YYYY-MM-DDTHH:mm:ss.SSS')
        let end = moment(filter.options.max).format('YYYY-MM-DDTHH:mm:ss.SSS')
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
      } else if (column.type === 'boolean' && filter.options && filter.options.selected) {
        let join = filter.options.join || 'or'
        let joined = filter.options.selected.join(' ' + join + ' ')
        query.where(joined)
      } else if (column.type === 'number' && filter.options && filter.options.currentRange) {
        let first = parseInt(filter.options.currentRange[0], 10)
        let last = parseInt(filter.options.currentRange[1], 10)
        query.where(key + '>=' + first + ' and ' + key + '<=' + last)
      }
    }
  }
  query = query.limit(9999999)
  return query.getURL()
}

// Endpoints

function endpointApiMigration (id) {
  return API_ROOT + `api/migrations/${id}.json`
}

function endpointCount (id) {
  return API_ROOT + `resource/${id}.json?$select=count(*)`
}

function endpointQuery (state) {
  return constructQuery(state)
}

function endpointColumns (id) {
  return API_ROOT + `resource/cq5k-ka7d.json?$where=datasetid='${id}'`
}

function endpointTableQuery (state) {
  let consumerRoot = API_ROOT.split('/')[2]
  let consumer = new soda.Consumer(consumerRoot)
  let id = state.metadata.dataId || state.metadata.id
  let { table, columnProps: { columns }} = state
  let page = table.tablePage || 0

  let query = consumer.query()
    .withDataset(id)
    .limit(1000)
    .offset(1000 * page)

  if (table.sorted && table.sorted.length > 0) {
    table.sorted.forEach((key) => {
      if (columns[key] && columns[key].sortDir !== null) {
        query.order(key + ' ' + columns[key].sortDir)
      }
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

function transformColumns (json) {
  let response = {}
  let columns = {}
  // for now, we'll have to refactor and bring consistency to this between our data dictionary work and the explorer
  let fieldTypeMap = {
    'numeric': 'number',
    'timestamp': 'date',
    'checkbox': 'boolean',
    'geometry: point': 'location'
  }

  for (let column of json) {
    let type = fieldTypeMap[column['field_type']] || column['field_type']
    columns[column['api_key']] = {
      id: column['columnid'],
      key: column['api_key'],
      name: column['field_name'].replace(/[_-]/g, ' '),
      alias: column['field_alias'] || '',
      description: column['field_definition'] || '',
      type
    }
  }
  response.columns = columns
  return response
}

// refactor
function reduceGroupedData (data, groupBy) {

  // collect unique labels
  let groupedData = uniq(data.map((obj) => {
    return obj['label']
  })).map((label) => {
    return {label: label}
  })

  let findInGroups = (i) => {
    return groupedData.findIndex((element, idx, array) => {
      return element['label'] === data[i]['label']
    })
  }

  // add columns to rows
  let i = 0
  let dataLength = data.length
  for (i; i < dataLength; i++) {
    let groupIdx = findInGroups(i)
    groupedData[groupIdx][data[i][groupBy]] = parseInt(data[i]['value'], 10)
  }

  return groupedData
}

function isDateColSelected(state){
  let selectedCol =  state.columnProps.columns[state.query.selectedColumn]
  if(selectedCol.type === 'date'){
    return true
  }
  return false
}

function getDateRange(json){
  let dateListJson = json.map(function(obj){
    return moment(obj.label, moment.ISO_8601).toISOString()
  })
  return dateListJson
}

function getDateGrp(state){
  if(state.query.hasOwnProperty('dateBy')){
    if(state.query.dateBy === 'month'){
      return 'month'
    }
  }
  return 'y'
}

function sortDateList(dateList){
  dateList.sort(function(a, b){
      let keyA = new Date(a.label),
        keyB = new Date(b.label);
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0
  })
  return dateList
}


function getDtsForMissingDates(json, state, dateBy){
  let dateList = []
  let startDate = moment(json[0]['label'], moment.ISO_8601)
  let endDate = moment(json[json.length - 1]['label'], moment.ISO_8601);
  let currentDate = startDate.clone()
  while (currentDate.isBefore(endDate)) {
    let currDt = currentDate.toISOString()
    dateList.push(currDt)
    currentDate.add(1, dateBy)
  }
  dateList.push( endDate.toISOString())
  return dateList
}

function addMissingDates(json, state){
  if(isDateColSelected(state)){
    let dateBy = getDateGrp(state)
    let dateList =  getDtsForMissingDates(json, state, dateBy)
    let jsonDts = getDateRange(json)
    let diff = difference(dateList, jsonDts)
    let jsonEmptyDates =  diff.map(function(diffDt){
      return makeEmptyDtChartData(diffDt, dateBy)
    })
    let fullDates =  json.concat(jsonEmptyDates)
    // sort the dates at the end
    return sortDateList(fullDates)
 }
 return json
}

function sortObjByKeys(obj){
  return Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]})
}

function getObjValsSorted(sortedKeys, obj){
    return sortedKeys.map(function(key){
      return obj[key]
    })
}

function addMissingDatesGrpBy(json, state){
  if(isDateColSelected(state)){
    json =  sortDateList(json)
    let grpVals = state.columnProps.columns[state.query.groupBy].categories
    grpVals = grpVals.map(function(item){
      return item['category']
    })
    let dateBy = getDateGrp(state)
    let dateList =  getDtsForMissingDates(json, state, dateBy)
    let jsonDts = getDateRange(json)
    let diff = difference(dateList, jsonDts)
    let blankJsonItems = []
    if(diff.length > 0){
      blankJsonItems = diff.map(function(item){
        let blankObj = {'label': item }
        grpVals.forEach(function(item){
          blankObj[item] = 0
        })
        return blankObj
      })
    }
    json = json.concat(blankJsonItems)
    let jsonGrpFill = json.map(function(item){
      let itemKeys = Object.keys(item)
      let index = itemKeys.indexOf('label')
      if (index > -1) {
        itemKeys.splice(index, 1);
      }
      let grpDiff = grpVals.filter(x => itemKeys.indexOf(x) < 0 );
      grpDiff.forEach(function(missing){
        item[missing]= 0
      })
      let itemKeysSorted = sortObjByKeys(item)
      let itemValsSorted = getObjValsSorted(itemKeysSorted, item)
      let newItem =  Object.assign({}, ...itemKeysSorted.map((n, index) => ({[n]: itemValsSorted[index]})))
      return newItem
    })
    jsonGrpFill =  sortDateList(jsonGrpFill)
    return jsonGrpFill
  }
  return json
}

function makeEmptyDtChartData(diffDt, dateBy){
  let sliceLen = 4
  if(dateBy === 'month'){
    sliceLen = 7
  }
  return {'label': diffDt, 'value':0, 'key': diffDt.slice(0,sliceLen) }
}


function formatJsonGrpBy (itemList, dateBy, isDateCol) {
    let newdict = {}
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    Object.keys(itemList).forEach(function (key, index) {
      if (key === 'label') {
        newdict[key] = String(itemList[key])
        if (newdict[key] === 'undefined') {
          newdict[key] = 'blank'
        }
      } else if (key === 'undefined') {
        newdict['blank'] = Number(itemList[key])
      } else {
        newdict[key] = Number(itemList[key])
      }
    })

    if (isDateCol) {
      let dt = newdict['label'].split('T')
      dt = dt[0].split('-')
      if (dateBy === 'month') {
        newdict['label'] = monthFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      } else {
        newdict['label'] = yrFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      }
    }
    return newdict
}

function castJsonGrpBy (json, state) {
    let formattedJson = []
    let dateBy = state.query.dateBy
    let isDtCol = isDateColSelected(state)
    for (let i = 0; i < json.length; i++) {
      let newdict = formatJsonGrpBy(json[i], dateBy, isDtCol)
      formattedJson.push(newdict)
    }
    return formattedJson
  }

function sortJsonGrpBy (json) {
    let sortedJsonGrp = []
    let grpSumDict = {}
    Object.keys(json).forEach(function (key, index) {
      grpSumDict[key] = sumObj(json[key], 'label')
    })
    let sorted = sortObj(grpSumDict)
    for (let i = 0; i < sorted.length; i++) {
      let idx = sorted[i][0]
      sortedJsonGrp.push(json[idx])
    }
    return sortedJsonGrp
  }


function formatJsonCol (itemList) {
    itemList = itemList.map(function (item, index) {
      item['key'] = String(item['label'])
      item['value'] = Number(item['value'])
      return item
    })
    return itemList
}

function formatJsonDateCol (itemList, dateBy) {
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    itemList = itemList.map(function (item, index) {
      if (dateBy === 'month') {
        let formattedDtMonth =  monthFormat(new Date(item['label']))
        item['label'] = formattedDtMonth
        item['key'] = formattedDtMonth
      } else {
        let formattedDtYear  = yrFormat(new Date(item['label']))
        item['label'] = formattedDtYear
        item['key'] = formattedDtYear
      }
      return item
    })
    return itemList
  }


function  castJson (json, state) {
    let formattedJson = []
    if (isDateColSelected(state)) {
      let dateBy = getDateGrp(state)
      formattedJson = formatJsonDateCol(json,dateBy)
    } else {
      formattedJson = formatJsonCol(json)
    }
    return formattedJson
  }


function transformTextCategoryData(json, state){
  json = json.map(function(item){
    if(!item.category){
      item.category = "Blank";
    }
    return item
  })
  return {
    selectedFieldCategories: {
      isFetching: false,
      categories: json
    }
  }
}
function transformQueryData (json, state) {
  let { query } = state
  let groupKeys = []

  if (query.groupBy && json.length > 0) {
    groupKeys = uniq(json.map((obj) => {
      return obj[query.groupBy]
    }))
    json = reduceGroupedData(json, query.groupBy)
    json = addMissingDatesGrpBy(json, state)
    json = castJsonGrpBy(json, state)
    if(!isDateColSelected(state)) {
      json = sortJsonGrpBy (json)
    }
  }
  if(json.length > 0 && !query.groupBy){
    json = replacePropertyNameValue(json, 'label', 'undefined', 'blank')
    json = addMissingDates(json, state)
    json =  castJson (json, state)
  }
  return {
    query: {
      isFetching: false,
      data: [],
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
  return {dataId: json.nbeId}
}


function transformColumnProperties (json, state, params) {
  return {
    columns: {
      [params['key']]: {
        categories: json
      }
    }
  }
}



