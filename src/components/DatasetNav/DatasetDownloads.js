import React from 'react'
import { MenuItem, NavDropdown } from 'react-bootstrap'

const tabularTypes = {
  'csv': 'CSV (Spreadsheet)',
  'json': 'JSON'
}

const spatialTypes = {
  'GeoJSON': 'GeoJSON',
  'Shapefile': 'Shapefile',
  'KML': 'KML',
  'KMZ': 'KMZ'
}

const DownloadLinks = ({id, dataId, hasGeo, onDownload}) => {

  const handleDownload = (link, type) => {
    if (typeof onDownload === 'function') {
      onDownload(link, type)
    }
  }

  let downloads = Object.keys(tabularTypes).map((type, i) => {
    let downloadLink = 'https://data.sfgov.org/resource/' + dataId + '.' + type + '?$limit=99999999999'
    return (
      <MenuItem href={downloadLink} key={'tabular_'+i} eventKey={'tabular_'+i} download='Download' onClick={handleDownload.bind(this, downloadLink, tabularTypes[type])}>
        {tabularTypes[type]}
      </MenuItem>
    )
  })

  if (hasGeo) {
    let spatialDownloads = Object.keys(spatialTypes).map((type, i) => {
      let downloadLink = 'https://data.sfgov.org/api/geospatial/' + dataId + '?method=export&format=' + type
      return (
        <MenuItem href={downloadLink} key={'spatial_'+i} eventKey={'spatial_'+i} download='Download' onClick={handleDownload.bind(this, downloadLink, spatialTypes[type])}>
          {spatialTypes[type]}
        </MenuItem>
      )
    })
    downloads = downloads.concat(<MenuItem divider key={'divider'} />).concat(spatialDownloads)
  }
  return (
    <NavDropdown id='DatasetDownloads' eventKey={1} title='Download'>
      {downloads}
    </NavDropdown>)
}

export default DownloadLinks
