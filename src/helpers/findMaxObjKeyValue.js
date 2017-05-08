module.exports = function findMaxObjKeyValue (arr, prop) {
  let max
  let maxValue = 0
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!max || parseInt(arr[i][prop], 10) > parseInt(max[prop], 10)) {
        max = arr[i]
      }
      maxValue = parseInt(max[prop], 10)
    }
  // console.log(max)
  }
  return maxValue
}
