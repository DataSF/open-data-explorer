
let findCeiling = require('./findCeiling.js')
let roundNumberByPower= require('./roundNumberByPower.js')

module.exports = function roundAxisZeros (maxValue, numberOfTicks, maxPowerOf10) {
    // rounds the max value to nearest ceiling
  let valueAxisTickLst = []
  if (maxValue) {
    let valueAxisTickIncrement = Math.round(maxValue, 0)
    if (maxValue < 50) {
      valueAxisTickIncrement = Math.round((maxValue / (numberOfTicks - 1)), 2)
    } else {
      let powerToRound = findCeiling(maxValue, maxPowerOf10)
      valueAxisTickIncrement = roundNumberByPower((maxValue / numberOfTicks), powerToRound)
    }
    let valueAxisTickIncrementLast = 0
    for (let i = 0; i < numberOfTicks; i++) {
      if (valueAxisTickIncrementLast < (maxValue + valueAxisTickIncrement)) {
        valueAxisTickLst.push(valueAxisTickIncrementLast)
        valueAxisTickIncrementLast = valueAxisTickIncrementLast + valueAxisTickIncrement
      } else {
        break
      }
    }
  }
  return valueAxisTickLst
}
