module.exports = function setClassNamesShowHide (obj, classNameObj) {
  let classNames = [classNameObj.base]
  if (obj.isSelected) {
    classNames.push(classNameObj['isSelected'])
  } else {
    classNames.push(classNameObj['notSelected'])
  }
  return classNames.join(' ')
}
