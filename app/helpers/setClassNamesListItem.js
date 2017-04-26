
import setClassNamesShowHide from './setClassNamesShowHide.js'

module.exports = function setClassNamesListItem (obj, propName, classNameObj) {
  let classNames = [setClassNamesShowHide(obj, classNameObj)]
  classNames.push('field-type-' + obj[propName])
  return classNames.join(' ')
}

