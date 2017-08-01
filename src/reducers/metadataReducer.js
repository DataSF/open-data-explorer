import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'

export const metadataReducer = (state = {}, action) => {
  
  if (action.response) {
    switch (action.type) {
      case ActionTypes.COUNT_SUCCESS:
      case ActionTypes.METADATA_SUCCESS:
      case ActionTypes.MIGRATION_SUCCESS:
        return merge({}, state, action.response)
      default:
        return state
    }
  }

  switch (action.type) {
    default:
      return state

  }
}
