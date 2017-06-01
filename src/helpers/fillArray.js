
module.exports = function fillArray (value, len, arr) {
  for (var i = 0; i < len; i++) {
    arr.push(value)
  }
  return arr
}
