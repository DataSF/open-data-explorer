module.exports = function findMaxObjKeyValue (arr, prop) {
  let max
  let maxValue = 0
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!max || parseInt(arr[i][prop]) > parseInt(max[prop])) {
        max = arr[i]
      }
      maxValue = parseInt(max[prop])
    }
  // console.log(max)
  }
  return maxValue
}
