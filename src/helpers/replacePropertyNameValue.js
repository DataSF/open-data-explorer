module.exports = function replacePropertyNameValue (arr, prop, keyToReplace, replacementValue) {
  // /replaces a key value for a list of dict objects

  // copy the array
  let arrClone = arr.slice(0)
  for (var i = 0; i < arrClone.length; i++) {
    if (arrClone[i][prop] === keyToReplace) {
      arrClone[i][prop] = replacementValue
    }
    if (!(prop in arrClone[i])) {
      arrClone[i][prop] = replacementValue
    }
  }
  return arrClone
}
