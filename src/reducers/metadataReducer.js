import * as ActionTypes from '../actions'
import moment from 'moment'

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

export const metadataReducer = (state = {}, action) => {

  if (action.response) {
    switch (action.type) {
      case ActionTypes.METADATA_SUCCESS:
      case ActionTypes.RELATEDDATASET_SUCCESS:
        return Object.assign({}, state, action.response)
      default:
        return state
    }
  }

  switch (action.type) {
    case ActionTypes.METADATA_REQUEST:
      return {}
    default:
      return state

  }
}