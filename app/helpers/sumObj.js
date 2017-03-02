module.exports = function sumObj (obj, skipKey) {
  let sum = 0
  for (let el in obj) {
    if (el !== skipKey) {
      console.log(el)
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el])
      }
    }
  }
  return sum
}
