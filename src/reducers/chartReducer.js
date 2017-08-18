import * as ActionTypes from '../actions'
import { updateObject, createReducer } from './reducerUtilities'
import { findMaxObjKeyValue, fillArray,transformOthers,  isColTypeTest, padDomainMax} from '../helpers'
// import d3 from 'd3'
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
    chartType: action.chartType,
  })
}

function resetState (state, action) {
  return {}
}

function changeRollUpBy (state, action) {
  console.log("***** roll up by option*****")
  console.log(action)
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

export const setDefaultChartTypeAfterLoad = (selectedColumnDef, chartType) => {
  if(selectedColumnDef){
    let isDateCol = isColTypeTest(selectedColumnDef, 'date')
    let isNumericCol = isColTypeTest(selectedColumnDef, 'number')
    if (!(chartType)) {
      if (isDateCol) {
        chartType = 'line'
      } else if (isNumericCol) {
        chartType = 'histogram'
      } else {
        chartType = 'bar'
      }
    }
    return chartType
  }
  return chartType
}


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

function getMaxGrpBy (chartType, chartData) {
    if (chartType === 'line') {
      return findMaxObjKeyValueGrpByUnStacked(chartData)
    } else {
      return findMaxObjKeyValueGrpByStacked(chartData)
    }
}

function findMaxObjKeyValueGrpByUnStacked(chartData){
    let allVals = []
    chartData.forEach(function(item){
      let itemCopy = Object.assign({}, item);
      delete itemCopy.label
      let itemVals = Object.values(itemCopy)
      let itemMax = Math.max.apply(null, itemVals)
      allVals.push(itemMax)
    })
    return Math.max.apply(null, allVals)
}

function findMaxObjKeyValueGrpByStacked(chartData){
    let allVals = []
    chartData.forEach(function(item){
      let itemCopy = Object.assign({}, item);
      delete itemCopy.label
      let colSum = Object.values(itemCopy).reduce((a, b) => a + b, 0)
      allVals.push(colSum)
    })
    return Math.max.apply(null, allVals)
}

export const getMaxDomain = (chartData, isGroupBy, chartType)  => {
  let maxValue = 0
  if (chartData.length > 0){
    if (!isGroupBy){
      maxValue = findMaxObjKeyValue(chartData, 'value')
    } else {
      maxValue = getMaxGrpBy(chartType, chartData)
    }
  }
  let domainMax = padDomainMax(maxValue)
  return domainMax
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

export const rollUpOtherBars = (chartData, selectedColumnDef, rollupBy, isGroupBy, domainMax) => {
  if(typeof chartData !== 'undefined'){
    console.log("*** in here rolling****")
    if ((chartData.length > 0) && (rollupBy === 'other')) {
      let isDtCol = isColTypeTest(selectedColumnDef, 'date')
      if (!isDtCol) {
        let chartDataTop15 = transformOthers(chartData, domainMax, isGroupBy)
        if (chartDataTop15) {
          return chartDataTop15['chartData']
        }
      }
    }
  }else{
    chartData = []
  }
  return chartData
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
