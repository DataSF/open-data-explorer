module.exports = function transformOthers (chartData, maxValue, isGroupBy) {
  if (chartData.length < 13) {
    return chartData
  }
  let chartDataTop13 = chartData.slice(0, 13)
  let chartDataRest = chartData.slice(13, chartData.length)
  if (!isGroupBy) {
    let otherSum = 0
    for (let i = 0; i < chartDataRest.length; i++) {
      otherSum += chartDataRest[i]['value']
    }
    chartDataTop13.push({'key': 'other', 'value': otherSum})
    return chartDataTop13
    //return {'chartData': chartDataTop13, 'lenOthers': chartDataRest.length}
  }else{
    let otherObj = {}
    for (let i = 0; i < chartDataRest.length; i++) {
      let item = chartDataRest[i]
      for (let property in item) {
        if(property !== 'label'){
          if(Object.keys(otherObj).indexOf(property) > -1 ){
            let subProp = otherObj[property] + item[property]
            otherObj[property] = subProp
          }else{
            otherObj[property] =  item[property]
          }
        }
      }
    }
    otherObj['label'] = "other"

    chartDataTop13.push(otherObj)
    return chartDataTop13
  }
}

