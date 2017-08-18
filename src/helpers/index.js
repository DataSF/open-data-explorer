function H (value) {
  /* jshint validthis: true */
  if (!(this instanceof H)) return new H(value)
  this._wrapped = value
}


H.getMaxDomain = require('./getMaxDomain.js')
H.findMaxObjKeyValueGrpByStacked = require('./findMaxObjKeyValueGrpByStacked.js')
H.findMaxObjKeyValueGrpByUnStacked = require('./findMaxObjKeyValueGrpByUnStacked.js')
H.getMaxGrpBy = require('./getMaxGrpBy.js')
H.roundAxisZeros = require('./roundAxisZeros.js')
H.findCeiling = require('./findCeiling.js')
H.roundNumberByPower = require('./roundNumberByPower.js')
H.toTitleCase = require('./toTitleCase')
H.findMinObjKeyValue = require('./findMinObjKeyValue.js')
H.findMaxObjKeyValue = require('./findMaxObjKeyValue.js')
H.replacePropertyNameValue = require('./replacePropertyNameValue')
H.fillArray = require('./fillArray.js')
H.isColTypeTest = require('./isColTypeTest.js')
H.transformOthers = require('./transformOthers.js')
H.sumObj = require('./sumObj.js')
H.sortObj = require('./sortObj.js')
H.setClassNamesListItem = require('./setClassNamesListItem.js')
H.setDocumentTitle = require('./setDocumentTitle.js')
H.padDomainMax = require('./padDomainMax.js')
// Implement chaining
H.prototype = {
  value: function value () {
    return this._wrapped
  }
}

function fn2method (key, fn) {
  if (typeof fn !== 'function') return
  H.prototype[key] = function () {
    var args = [this._wrapped].concat(Array.prototype.slice.call(arguments))
    var res = fn.apply(null, args)
    // if the result is non-string stop the chain and return the value
    return typeof res === 'string' ? new H(res) : res
  }
}

// Copy functions to instance methods for chaining
for (var key in H) fn2method(key, H[key])
module.exports = H
