module.exports = function setDocumentTitle(title) {
  if (title) {
    document.title = 'DataSF Open Data Explorer | ' + title
  } else {
    document.title = 'DataSF Open Data Explorer'
  }
}