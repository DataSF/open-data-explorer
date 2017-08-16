
module.exports = function findCeiling (maxValue, maxPowerOf10) {
  let zerosRange = Array.apply(null, Array(maxPowerOf10)).map(function (_, i) { return i })
  for (let i = 1; i < zerosRange.length; i++) {
  let zeros = Math.pow(10, zerosRange[i])
  let zerosNext = Math.pow(10, zerosRange[i + 1])
  if ((zeros < maxValue) && (zerosNext > maxValue)) {
    if (i != 0) {
      return Math.pow(10, zerosRange[i -1])
    } else {
        return zeros
      }
    }
  }
}
