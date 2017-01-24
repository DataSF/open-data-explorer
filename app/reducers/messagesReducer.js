import * as ActionTypes from '../actions'
import { updateObject } from './reducerUtilities'

const initialState = {}

function setMessage (state, action) {
  return updateObject(state, {
    message: action.message,
    type: 'error',
    dismissable: false })
}

function clearAllMessages (state, action) {
  return initialState
}

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.QS_FAILURE:
    case ActionTypes.COUNT_FAILURE:
    case ActionTypes.COLPROPS_FAILURE:
    case ActionTypes.DATA_FAILURE: return setMessage(state, action)
    case ActionTypes.METADATA_REQUEST:
    case ActionTypes.SELECT_COLUMN: return clearAllMessages(state, action)
    default:
      return state
  }
}
