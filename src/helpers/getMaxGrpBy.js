
let findMaxObjKeyValueGrpByUnStacked = require('./findMaxObjKeyValueGrpByUnStacked.js')
let findMaxObjKeyValueGrpByStacked= require('./findMaxObjKeyValueGrpByStacked.js')

module.exports =  function getMaxGrpBy (chartType, chartData) {
    if (chartType === 'line') {
      return findMaxObjKeyValueGrpByUnStacked(chartData)
    } else {
      return findMaxObjKeyValueGrpByStacked(chartData)
    }
}
