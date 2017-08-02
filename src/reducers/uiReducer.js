import * as ActionTypes from '../actions'
import { createReducer, updateObject } from './reducerUtilities'

function showHideModal (state, action) {
  return updateObject(state, {
    modals: {
      [action.payload]: !state.modals[action.payload]
    }
  })
}

export const uiReducer = createReducer({ modals: { share: false } }, {
  [ActionTypes.SHOW_HIDE_MODAL]: showHideModal
})