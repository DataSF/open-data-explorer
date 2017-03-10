module.exports = function setClassNamesListItem (obj, propName) {
  console.log(obj)
  let classNames = ['ColumnSelector-list-group-item']
  if (obj.hasOwnProperty('isSelected')) {
    if (obj.isSelected) {
      classNames.push('is-selected')
    } else {
      classNames.push('not-selected')
    }
  }
  classNames.push('column-type-' + obj[propName])
  return classNames.join(' ')
}
