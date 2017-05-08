module.exports = function dataTypeColors (col) {
  let btnColors = ['#3498db', '#27ae60', '#16a085', '#7986cb', '#d35400', '#c0392b', '#a97964', '#8e44ad', '#f39c12']

  let numberFields = ['double', 'money', 'number']
  let textFields = ['text']
  let dateFields = ['date', 'calendar_date']
  let contactFields = ['email', 'phone', 'url']
  let locationFields = ['location']
  let booleanFields = ['boolean']
  let categoryFields = function (col) {
    if (col['categories']) {
      return true
    } else {
      return false
    }
  }
  let allFields = [categoryFields, numberFields, textFields, dateFields, contactFields, locationFields, booleanFields]

  let isType = function (col, fieldList) {
    if (typeof fieldList === 'function') {
      return fieldList(col)
    } else {
      if (fieldList.indexOf(col['type']) > -1) {
        return true
      }
    }
    return false
  }

  for (let i = 0; i < allFields.length; i++) {
    if (isType(col, allFields[i])) {
      return btnColors[i]
    }
  }
}
