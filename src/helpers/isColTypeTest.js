
module.exports = function isColTypeTest (selectedColumnDef, dataTypeToTest) {
  if(typeof selectedColumnDef !== 'undefined' && selectedColumnDef){
    if(Object.keys(selectedColumnDef).indexOf('type') > -1){
      if (selectedColumnDef.type === dataTypeToTest) {
        return true
      }
    }
  }
  return false
}
