module.exports = function sumObj (obj, skipKey) {
  let sum = 0
  for (let el in obj) {
    if (el !== skipKey) {
      if (obj.hasOwnProperty(el)) {
        sum += obj[el]
      }
    }
  }
  return sum
}
