module.exports = function transformOthers (chartData, maxValue, isGroupBy) {
  let others = []
  let keysExclude = []
  if (!isGroupBy) {
    if (chartData.length > 13) {
      let chartDataTop15 = chartData.slice(0, 13)
      let chartDataRest = chartData.slice(13, chartData.length)
      let otherSum = 0
      for (let i = 0; i < chartDataRest.length; i++) {
        otherSum += chartDataRest[i]['value']
      }
      chartDataTop15.push({'key': 'other', 'value': otherSum})
      return {'chartData': chartDataTop15, 'lenOthers': chartDataRest.length}
    }
  }
}

