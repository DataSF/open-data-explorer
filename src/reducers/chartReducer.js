import * as ActionTypes from '../actions'
import { updateObject, createReducer } from './reducerUtilities'

// case reducers
function updateData (state, action) {
  if (action.response.query) {
    return updateObject(state, {
      chartData: action.response.query.originalData,
      transformedChartData: action.response.query.data,
      isFetching: false,
      groupKeys: action.response.query.groupKeys
    })
  } else {
    return state
  }
}

function changeChartType (state, action) {
  return updateObject(state, {
    chartType: action.chartType
  })
}

function setDefaultChartType (state, action) {
  return updateObject(state, {
    chartType: action.chartType
  })
}

function resetState (state, action) {
  return {}
}

/*
function clearData (state, action) {
  return updateObject(state, {
    chartData: [],
    isFetching: true,
    groupKeys: []
  })
}
*/

// slice reducer - chart
export const chartReducer = createReducer({}, {
  [ActionTypes.METADATA_REQUEST]: resetState,
  [ActionTypes.DATA_SUCCESS]: updateData,
  [ActionTypes.APPLY_CHART_TYPE]: changeChartType,
  [ActionTypes.SET_DEFAULT_CHARTTYPE]: setDefaultChartType
})
