import * as ActionTypes from '../actions'
import moment from 'moment'
import { createReducer } from './reducerUtilities'

let initialState = { isFetching: true }

function makePercent (item) {
  let prcnt =parseFloat(item) * 100
  return String(prcnt.toFixed(2)) + "%"
}

export const makeDatasetFactDict = (state) => {
  const propsToKeep = {
    'rowCount': 'Number of Rows',
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
          let tags = value
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
    'createdAt': 'Dataset Creation Date'
  }
  let publishingFaqs = []
  Object.keys(pubFieldDetails).forEach(function (key) {
    if ((state.metadata[key]) && (typeof state.metadata[key] !== 'undefined')) {
      let value = state.metadata[key]
      if (key === 'createdAt') {
        value = parseDt(value)
      }
      else if(key === 'days_since_first_created') {
        value = moment.utc(state.metadata['createdAt']).local().fromNow()
        value = value.split('ago')
        value = value[0] + ' old'
      }
      else if(key === 'days_since_last_updated') {
        value = moment.utc(state.metadata['rowsUpdatedAt']).local().fromNow()
      }
      publishingFaqs.push({'header': pubFieldDetails[key], 'value': value})
    }
  })
  return publishingFaqs
}

//case reducers

function updateData (state, action) {
  return Object.assign({}, state, action.response)
}

function resetState (state, action) {
  if (ActionTypes.METADATA_REQUEST && state.fromSearch !== true) {
    return initialState
  }
  return state
}

function preloadMetadata (state, action) {
  let data = action.payload
  data.fromSearch = true
  data.isFetching = false
  data.relatedDatasetCnt = 0
  data.relatedDatasets = []
  data.attachments = null
  data.notes = null
  return Object.assign({}, state, data)
}

// reducer

export const metadataReducer = createReducer(initialState, {
  [ActionTypes.METADATA_SUCCESS]: updateData,
  [ActionTypes.RELATEDDATASET_SUCCESS]: updateData,
  [ActionTypes.METADATA_REQUEST]: resetState,
  [ActionTypes.SELECT_SEARCH_RECORD]: preloadMetadata
})