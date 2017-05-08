
module.exports = function sortObj (obj) {
  let sortable = []
  for (let item in obj) {
    sortable.push([Number(item), obj[item]])
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1]
  })
  return sortable
}
