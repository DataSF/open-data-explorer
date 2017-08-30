module.exports = function findMaxObjKeyValueGrpByUnStacked(chartData){
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
