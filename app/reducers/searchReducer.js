import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
/*
import union from 'lodash/union'
import uniq from 'lodash/uniq'
*/
import { updateObject, createReducer } from './reducerUtilities'

let initialState = {
  searchState: {
    query: ''
  }
}

// case reducers
function updateSearch (state, action) {
  return updateObject(state, action.payload)
}

function clearSearch (state, action) {
  return initialState
}

// create reducer
export const searchReducer = createReducer(initialState, {
  [ActionTypes.UPDATE_SEARCH]: updateSearch,
  [ActionTypes.CLEAR_SEARCH]: clearSearch
})
