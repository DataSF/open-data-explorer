import * as ActionTypes from '../actions'
import { createReducer } from './reducerUtilities'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'

// case reducers
function updateData (state, action) {
  if (action.response.table) {
    return Object.assign({}, state, {
      tableData: action.response.table.data,
      isFetching: false
    })
  } else {
    return state
  }
}

function loadTable (state, action) {
  return merge({}, state, {
    tablePage: 0,
    isFetching: true
  })
}

function updatePage (state, action) {
  return merge({}, state, {
    tablePage: action.page
  })
}

function sortColumn (state, action) {
  let updatedState = {
      sorted: state.sorted ? uniq([action.key].concat(state.sorted)) : [action.key]
  }
  return merge({}, state, updatedState)
}

// create reducer
export const tableReducer = createReducer({}, {
  [ActionTypes.DATA_SUCCESS]: updateData,
  [ActionTypes.LOAD_TABLE]: loadTable,
  [ActionTypes.UPDATE_PAGE]: updatePage,
  [ActionTypes.SORT_COLUMN]: sortColumn
})