import * as ActionTypes from '../actions'
import { updateObject, createReducer } from './reducerUtilities'
import { findMaxObjKeyValue, isColTypeTest, sumObj, sortObj, transformOthers , fillArray, findCeiling, roundNumberByPower} from '../helpers'
import d3 from 'd3'
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
  let maxValue, domainMax
  if(chartData.length > 0){
    console.log("****in hereeee*****")
    if(!isGroupBy){
      maxValue = findMaxObjKeyValue(chartData, 'value')
      }else{
        maxValue = getMaxGrpBy (chartType, chartData)
    }
    console.log(maxValue)
    if(maxValue){
      if( 1 > maxValue){
        domainMax = maxValue * 2
      }
      else if (1 < maxValue < 5){
        domainMax = maxValue * 1.3
      }
      else if (5 < maxValue < 10){
        domainMax = maxValue * 1.10
      }
      else {
        domainMax = maxValue * 1.03
      }
    }
  }
  return domainMax
}



export const roundAxisZeros = (maxValue, numberOfTicks, maxPowerOf10) => {
    // rounds the max value to nearest ceiling
    let valueAxisTickLst = []
    if(maxValue){
      let valueAxisTickIncrement = Math.round(maxValue, 0)
      if (maxValue < 50) {
        valueAxisTickIncrement = Math.round((maxValue / (numberOfTicks-1)), 2)
      } else {
        let powerToRound = findCeiling(maxValue, maxPowerOf10)
        valueAxisTickIncrement = roundNumberByPower((maxValue / numberOfTicks), powerToRound)
      }
      let valueAxisTickIncrementLast = 0
      for (let i = 0; i < numberOfTicks; i++) {
        if (valueAxisTickIncrementLast < (maxValue + valueAxisTickIncrement)) {
          valueAxisTickLst.push(valueAxisTickIncrementLast)
          valueAxisTickIncrementLast = valueAxisTickIncrementLast + valueAxisTickIncrement
        } else {
          break
        }
      }
    }
    return valueAxisTickLst
}

// slice reducer - chart
export const chartReducer = createReducer({}, {
  [ActionTypes.METADATA_REQUEST]: resetState,
  [ActionTypes.DATA_SUCCESS]: updateData,
  [ActionTypes.APPLY_CHART_TYPE]: changeChartType,
  [ActionTypes.SET_DEFAULT_CHARTTYPE]: setDefaultChartType
})

export default chartReducer
