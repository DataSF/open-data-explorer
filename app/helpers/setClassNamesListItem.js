module.exports = function setClassNamesListItem (obj, propName, optionalClassNames) {
  let classNames = ['ColumnSelector-list-group-item', 'column-type']
  if (obj.hasOwnProperty('isSelected')) {
    if (obj.isSelected) {
      classNames.push('is-selected')
    } else {
      classNames.push('not-selected')
    }
  }
  classNames.push('column-type--' + obj[propName])
  if (optionalClassNames) {
    classNames = classNames.concat(optionalClassNames)
  }
  return classNames.join(' ')
}
