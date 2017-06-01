import * as ActionTypes from '../actions'
// import { updateObject, removeByKey, updateByKey } from './reducerUtilities'
import merge from 'lodash/merge'

export const tableReducer = (state = {}, action) => {
  if (action.response) {
    switch (action.type) {
      case ActionTypes.DATA_SUCCESS:
        if (action.response.table) {
          return Object.assign({}, state, {
            tableData: action.response.table.data,
            isFetching: false
          })
        } else {
          return state
        }
      default:
        return state
    }
  }
  switch (action.type) {
    case ActionTypes.LOAD_TABLE:
      return merge({}, state, {
        tablePage: 0,
        isFetching: true
      })
    default:
      return state
  }
}
