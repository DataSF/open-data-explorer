import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import union from 'lodash/union'
import uniq from 'lodash/uniq'
import moment from 'moment'

export const metadataReducer = (state = {}, action) => {
  let copyState

  if (action.response) {
    switch (action.type) {
      case ActionTypes.COUNT_SUCCESS:
      case ActionTypes.METADATA_SUCCESS:
      case ActionTypes.MIGRATION_SUCCESS:
      case ActionTypes.RELATEDDATASET_SUCCESS:
        let merged = merge({}, state, action.response)
        return Object.assign({}, state, merged)
      case ActionTypes.COLPROPS_SUCCESS:
        if (ActionTypes.COLPROPS_SUCCESS) {
          action.response.categoryColumns = union([], state.categoryColumns, action.response.categoryColumns)
        }
        return merge({}, state, action.response)
      // remove - move to table and chart objects
      case ActionTypes.DATA_SUCCESS:
        let merged2 = merge({}, state, action.response)
        if (action.response.query) {
          merged2.query.data = action.response.query.data
        } else {
          merged2.table.data = action.response.table.data
        }
        return Object.assign({}, state, merged2)
      default:
        return state
    }
  }

  switch (action.type) {
    case ActionTypes.LOAD_TABLE:
      return merge({}, state, {
        table: {
          tablePage: 0,
          isFetching: true
        }
      })
    case ActionTypes.UPDATE_PAGE:
      return merge({}, state, {
        table: {
          tablePage: action.page
        }
      })
    case ActionTypes.METADATA_REQUEST:
      let freshState = {
        query: {
          isFetching: true,
          dateBy: 'year'
        },
        columns: {}
      }
      return merge({}, freshState)
    // move to table
    case ActionTypes.SORT_COLUMN:
      let updatedState = {
        table: {
          sorted: state.table.sorted ? uniq([action.key].concat(state.table.sorted)) : [action.key]
        },
        columns: {
          [action.key]: {
            sortDir: action.dir
          }
        }
      }
      return merge({}, state, updatedState)
    case ActionTypes.SELECT_COLUMN:
      let updatedQuery = {
        query: {
          isFetching: true,
          selectedColumn: action.payload
        }
      }
      if (state.query.groupBy === action.column) {
        updatedQuery.query.groupBy = null
      }
      return merge({}, state, updatedQuery)
    case ActionTypes.GROUP_BY:
      let groupKey = action.payload ? action.payload.value : null
      return merge({}, state, {
        query: {
          groupBy: groupKey
        }
      })
    case ActionTypes.SUM_BY:
      let sumKey = action.payload ? action.payload.value : null
      return merge({}, state, {
        query: {
          sumBy: sumKey
        }
      })
    case ActionTypes.CHANGE_DATEBY:
      return merge({}, state, {
        query: {
          dateBy: action.payload
        }
      })
    case ActionTypes.ADD_FILTER:
      return merge({}, state, {
        query: {
          filters: {
            [action.payload.value]: {}
          }
        }
      })
    case ActionTypes.APPLY_CHART_TYPE:
      return merge({}, state, {
        query: {
          chartType: action.chartType
        }
      })
    case ActionTypes.REMOVE_FILTER:
      copyState = {...state}
      delete copyState.query.filters[action.payload]
      return merge({}, state, copyState)
    case ActionTypes.UPDATE_FILTER:
      let newOptions = action.payload.options
      copyState = Object.assign({}, state)
      let existingOptions = copyState.query.filters[action.payload.key].options || ''
      let isSelected = (newOptions.selected)
      let newState

      if (isSelected && Array.isArray(existingOptions.selected) &&
        (existingOptions.selected.length !== newOptions.selected.length || typeof newOptions.selected === 'string')) {
        copyState.query.filters[action.payload.key].options.selected = action.payload.options.selected
        newState = merge({}, copyState)
      } else {
        let updatedOptions = {
          query: {
            filters: {
              [action.payload.key]: {
                options: action.payload.options
              }
            }
          }
        }
        newState = merge({}, state, updatedOptions)
      }
      return newState
    default:
      return state

  }
}

function makePercent (item) {
  let prcnt =parseFloat(item) * 100
  return String(prcnt.toFixed(2)) + "%"
}
export const makeDatasetFactDict = (state) => {
  const propsToKeep = {'rowCount': 'Number of Rows',
                        'rowLabel': 'Row Label',
                        'rowIdentifier': 'Row Identifier',
                        'documented_percentage': 'Percent of Fields Documented',
                        'dupe_record_percent': 'Duplicate Record Percent',
                        'category': 'Category',
                        'keywords': 'Tags'
                      }
  let datasetFacts = []
  Object.keys(propsToKeep).forEach(function (key) {
      if ((state.metadata[key]) && (typeof state.metadata[key] !== 'undefined')) {
        let value = state.metadata[key]
        if (key === 'documented_percentage' || key === 'dupe_record_percent') {
          value = makePercent(state.metadata[key])
        }
        if(key === 'keywords'){
          let tags = value.split(",")
          value = tags.join(", ")
        }
        datasetFacts.push({'header': propsToKeep[key], 'value': value})
      }
  })
  return datasetFacts
}

export const makeColTypesCnt = (state) => {
  const colTypesCnt = {
    'field_count': 'Field Count',
    'text_count': 'Text Field Count',
    'numeric_count': 'Number Field Count',
    'boolean_count': 'True/False Field Count',
    'timestamp_count': 'Timestamp Field Count',
    'time_count': 'Time Field Count',
    'blob_count': 'Blob Field Count',
    'point_count': 'Geometry: Point Field Count',
    'line_count': 'Geometry: Line Field Count',
    'polygon_count': 'Geometry: Polygon Field Count',
    'multipoint_count': 'Geometry: Multipoint Field Count',
    'multiline_count': 'Geometry: Multiline Field Count',
    'multipolygon_count': 'Geometry: Multipolygon Field Count'
  }
  let colCounts = []
  Object.keys(colTypesCnt).forEach(function (key) {
      if ((state.metadata[key]) && (typeof state.metadata[key] !== 'undefined')) {
        if( parseInt(state.metadata[key], 10) !== 0){
          colCounts.push({'header': colTypesCnt[key], 'value': state.metadata[key]})
        }
      }
  })
  return colCounts
}

export const calculatePublishingHealth = (state) => {
  let pubFreq =  state.metadata.publishingFrequency
  let dayslastUpdt = state.metadata.days_since_last_updated
  const healthThresholds = {
    'Streaming': [2,7],
    'Daily' : [2,7],
    'Weekly': [7,21],
    'Monthly': [32, 90],
    'Bi-annually': [60, 180],
    'Annually': [365,500],
    'Quarterly': [90, 270]
  }
  if (Object.keys(healthThresholds).includes(pubFreq)) {
    let timeIntervals = healthThresholds[pubFreq]
    if (parseInt(dayslastUpdt, 10) <= timeIntervals[0]) {
      return {'value': 'On Time', 'className': 'healthy'}
    } else if ((parseInt(dayslastUpdt, 10) > timeIntervals[0]) && (parseInt(dayslastUpdt, 10) <= timeIntervals[1])) {
      return {'value': 'Delayed', 'className': 'delayed'}
    } else if (parseInt(dayslastUpdt, 10) > timeIntervals[1]) {
      return {'value': 'Stale', 'className': 'stale'}
    }
  }
  return {'value': 'On Time', 'className': 'healthy'}
}

function parseDt(dt){
  dt =  dt.split("T")
  return dt[0]
}


export const makePublishingFacts = (state) => {
  const pubFieldDetails = {
    'days_since_last_updated':'Last Updated',
    'publishingFrequency': 'Publishing Frequency',
    'dataChangeFrequency': 'Data Change Frequency' ,
    'createdAt': 'Dataset Creation Date',
    // 'days_since_first_created': 'Dataset Age',
  }
  let publishingFaqs = []
  Object.keys(pubFieldDetails).forEach(function (key) {
    if ((state.metadata[key]) && (typeof state.metadata[key] !== 'undefined')) {
      let value = state.metadata[key]
      if (key === 'createdAt') {
        value = parseDt(value)
      }
      else if(key === 'days_since_first_created') {
        value = moment(state.metadata['createdAt']).fromNow()
        value = value.split('ago')
        value = value[0] + ' old'
      }
      else if(key === 'days_since_last_updated') {
        value = moment(state.metadata['rowsUpdatedAt']).fromNow()
      }
      publishingFaqs.push({'header': pubFieldDetails[key], 'value': value})
    }
  })
  return publishingFaqs
}
