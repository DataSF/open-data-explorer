import * as ActionTypes from '../actions'
import { updateObject, createReducer } from './reducerUtilities'

const initialState = {}

function setFailureMessage (state, action) {
  let title = typeof action.status !== 'undefined' ? 'Server Error' : 'Application Error'
  return updateObject(state, {
    message: action.message,
    type: 'error',
    style: 'danger',
    title: title,
    dismissable: false,
    showChildren: false })
}

function checkForMessages (state, action) {
  let allZeroes = action.response.query && (action.response.query.originalData.length === 1 && action.response.query.originalData[0].label === '0')
  let noData = action.response.query && action.response.query.originalData.length === 0
  let message = noData ? 'The query returned no data.' : 'Column only contains values equal to 0.'
  message += ' Please try a different selection of columns and/or filters.'
  let title = noData ? 'Query returned no data' : 'No chart data'
  if (noData || allZeroes) {
    return updateObject(state, {
      message,
      type: 'info',
      style: 'info',
      title,
      dismissable: false,
      showChildren: false
    })
  } 
  
  if (action.response.query && action.response.query.originalData.length > 0) {
    return initialState
  }

  return state
}

function clearAllMessages (state, action) {
  return initialState
}

export const messagesReducer = createReducer(initialState, {
  [ActionTypes.QS_FAILURE]: setFailureMessage,
  [ActionTypes.COLPROPS_FAILURE]: setFailureMessage,
  [ActionTypes.DATA_FAILURE]: setFailureMessage,
  [ActionTypes.METADATA_REQUEST]: clearAllMessages,
  [ActionTypes.SELECT_COLUMN]: clearAllMessages,
  [ActionTypes.DATA_SUCCESS]: checkForMessages
})