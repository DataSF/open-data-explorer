import React, { Component } from 'react'
import { MenuItem, DropdownButton } from 'react-bootstrap'

// ToDo: create isGeo property of the dataset, also possibly abstract this out of here to allow different configurable URL patterns (not tied to Socrata)
let downloadTypes = {
  'csv': 'CSV (Spreadsheet)',
  'json': 'JSON',
  'geojson': 'GeoJSON'
}
// should be abstracted more to allow different download template links based or an array of link options, maybe can be loaded as part of middleware?
class DownloadLinks extends Component {

  render () {
    let options = Object.keys(downloadTypes)
    let { apiDomain, id, dataId } = this.props

    if (dataId) {
      id = dataId
    }
    let menuItems = options.map(function (type, i) {
      let downloadLink = 'https://' + apiDomain + '/resource/' + id + '.' + type + '?$limit=99999999999'
      return (
        <MenuItem href={downloadLink} key={i} eventKey={i} download='Download'>
          {downloadTypes[type]}
        </MenuItem>
      )
    })

    return (
      <DropdownButton title='Download' id='bg-nested-dropdown' bsStyle='primary' bsSize='small' className={'datasetLinks'}>
        {menuItems}
      </DropdownButton>
    )
  }
}

export default DownloadLinks
