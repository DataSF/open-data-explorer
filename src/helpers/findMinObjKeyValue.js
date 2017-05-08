module.exports = function findMinObjKeyValue (arr, prop) {
  var min
  for (var i = 0; i < arr.length; i++) {
    if (!min || parseInt(arr[i][prop], 10) < parseInt(min[prop], 10)) {
      min = arr[i]
    }
  }
  return min
}
