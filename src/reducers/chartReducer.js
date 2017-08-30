import * as ActionTypes from '../actions'
import { updateObject, createReducer } from './reducerUtilities'
import { fillArray, getMaxDomain } from '../helpers'
// import d3 from 'd3'
import chroma from 'chroma-js'
// case reducers
import {GRPBYCOLORSBASE, GRADIATIONFXNS} from '../constants/AppConstants'

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
  if(Object.keys(state).indexOf('groupKeys') > -1 ) {
    if(state.groupKeys.length > 0){
      return updateObject(state, {
        chartType: action.chartType,
        domainMax: getMaxDomain(state.chartData, true, action.chartType)
      })
    }
  }
  return updateObject(state, {
      chartType: action.chartType,
      domainMax: getMaxDomain(state.chartData, false, action.chartType)
  })
}

function setDefaultChartType (state, action) {
  return updateObject(state, {
    chartType: action.chartType,
    chartColor: "#2196f3"
  })
}

function resetState (state, action) {
  return {}
}

function changeRollUpBy (state, action) {
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

function setColorSteps(gradiationFxn, step) {
  let groupColors = GRPBYCOLORSBASE.map(function(color){
    let cl = chroma(color)
    let colorItem =  gradiationFxn(cl, step)
    return colorItem
  })
  return groupColors
}

function makeColors(groupColors, step){
  Object.keys(GRADIATIONFXNS).forEach(function(gradientFxnKey){
    let groupColorsStep = setColorSteps(GRADIATIONFXNS[gradientFxnKey], step)
    groupColors = groupColors.concat(groupColorsStep)
  })
  return groupColors
}
export const setGroupByColorScale = (chartColor, chartData, isGroupBy) => {
  let groupColors = GRPBYCOLORSBASE
  if(chartData.length > 0){
    if(isGroupBy){
      if(Object.keys(chartData[0]).length < GRPBYCOLORSBASE.length){
        return GRPBYCOLORSBASE
      }else{
        let step = 1
        while ( groupColors.length < Object.keys(chartData[0]).length){
          //console.log(step)
          //console.log("** here chart data****")
          //console.log(Object.keys(chartData[0]).length)
          //console.log("** grp colors****")
          //console.log(groupColors.length)
          //console.log("****** here ****")
          groupColors = groupColors.concat(makeColors(groupColors,step))
          //console.log("** here chart data 2****")
          //console.log(Object.keys(chartData[0]).length)
          //console.log("** grp colors 2****")
          //console.log(groupColors.length)
          //console.log("****** here agai ****")
          step = step + 1
          //console.log(step)
        }
        //console.log("** returning colors***")
        //console.log(groupColors)
        return groupColors
      }
    }
  }
  return []
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
  [ActionTypes.SET_DEFAULT_CHARTTYPE]: setDefaultChartType,
})

export default chartReducer
