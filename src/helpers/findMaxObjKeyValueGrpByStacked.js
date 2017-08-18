module.exports = function findMaxObjKeyValueGrpByStacked(chartData){
    let allVals = []
    chartData.forEach(function(item){
      let itemCopy = Object.assign({}, item);
      delete itemCopy.label
      let colSum = Object.values(itemCopy).reduce((a, b) => a + b, 0)
      allVals.push(colSum)
    })
    return Math.max.apply(null, allVals)
}
