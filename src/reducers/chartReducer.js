import * as ActionTypes from '../actions'
import { updateObject, createReducer } from './reducerUtilities'
import { fillArray } from '../helpers'
// import d3 from 'd3'
// case reducers


function updateData (state, action) {
  if (action.response.query) {
    return updateObject(state, {
      chartData: action.response.query.originalData || [],
      transformedChartData: action.response.query.data,
      isFetching: false,
      groupKeys: action.response.query.groupKeys,
      domainMax: action.response.query.domainMax,
      rollupBy: action.response.query.rollupBy,
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
    chartType: action.chartType,
  })
}

function resetState (state, action) {
  return {}
}

function changeRollUpBy (state, action) {
  console.log("***** roll up by option*****")
  //console.log(action)
  return updateObject(state, {
    rollupBy: action.payload
  })
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




export const isGroupByz = (groupByKeys) => {
  let isGroupBy = false
  if (groupByKeys) {
    if (groupByKeys.length > 1) {
      isGroupBy =  true
    }
  }
  //if(isGroupBy && groupKeys.length === 1){
    //  isGroupBy = false
  //}
  return isGroupBy
}

export const isSelectedColDate = (selectedColumnDef) => {
  if( typeof selectedColumnDef !== 'undefined' && selectedColumnDef){
    if (selectedColumnDef.type === 'date') {
      return true
    }
  }
  return false
}



export const setXAxisTickInterval = (chartData) => {
  let xAxisInterval
  if(chartData){
    xAxisInterval =  Math.round(chartData.length * 0.09)
  }
  return xAxisInterval
}


export const explodeFrequencies = (chartData, chartType) => {
  let freqs = []
  if(chartData.length > 0 && chartType === 'histogram') {
    chartData.forEach(function (el) {
    // function fillArray (value, len, arr)
      freqs = fillArray(Number(el.key), Number(el.value), freqs)
    })
  }
  return freqs
}



export const rollUpChartData = (query,chartType, chartData) => {
  let rollupBy = false
  if(Object.keys(query).indexOf('rollupBy') > -1 ) {
    rollupBy = query.rollupBy
  }
  else if (chartType && chartData){
    if((chartType === 'bar') && (chartData.length > 12) && !rollupBy) {
      rollupBy = 'other'
    }else{
      rollupBy = 'none'
    }
  }else{
    rollupBy = 'none'
  }
  return rollupBy
}


// slice reducer - chart
export const chartReducer = createReducer({}, {
  [ActionTypes.METADATA_REQUEST]: resetState,
  [ActionTypes.DATA_SUCCESS]: updateData,
  [ActionTypes.CHANGE_ROLLUPBY]: changeRollUpBy,
  [ActionTypes.APPLY_CHART_TYPE]: changeChartType,
  [ActionTypes.SET_DEFAULT_CHARTTYPE]: setDefaultChartType
})

export default chartReducer
