let findMaxObjKeyValue = require('./findMaxObjKeyValue.js')
let getMaxGrpBy = require('./getMaxGrpBy.js')
let padDomainMax = require('./padDomainMax.js')

module.exports = function getMaxDomain (chartData, isGroupBy, chartType){
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
