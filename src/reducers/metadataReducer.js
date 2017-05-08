import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import union from 'lodash/union'
import uniq from 'lodash/uniq'

export const metadataReducer = (state = {}, action) => {
  let copyState

  if (action.response) {
    switch (action.type) {
      case ActionTypes.COUNT_SUCCESS:
      case ActionTypes.METADATA_SUCCESS:
      case ActionTypes.MIGRATION_SUCCESS:
      case ActionTypes.COLPROPS_SUCCESS:
        if (ActionTypes.COLPROPS_SUCCESS) {
          action.response.categoryColumns = union([], state.categoryColumns, action.response.categoryColumns)
        }
        return merge({}, state, action.response)
      // remove - move to table and chart objects
      case ActionTypes.DATA_SUCCESS:
        let merged = merge({}, state, action.response)
        if (action.response.query) {
          merged.query.data = action.response.query.data
        } else {
          merged.table.data = action.response.table.data
        }
        return Object.assign({}, state, merged)
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
