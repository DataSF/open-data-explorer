
module.exports = function isColTypeTest (selectedColumnDef, dataTypeToTest) {
  if (selectedColumnDef.type === dataTypeToTest) {
    return true
  }
  return false
}
