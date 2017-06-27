import './@Dataset.css'

import React, { Component } from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import DownloadLinks from './DatasetDownloads'
import moment from 'moment'

class DatasetFrontMatter extends Component {
  render () {
    console.log(this.props)
    const { name, id, rowsUpdatedAt, apiDomain, dataId } = this.props
    let days_since_last_update =  String(this.props['days_since_last_updated'])
    let dayUpdated = moment(rowsUpdatedAt).format('MM/DD/YYYY')
    let timeUpdated = moment(rowsUpdatedAt).format('hh:mm A')
    return (
      <Row className={'dataSetTitle'} id='header'>
        <Col sm={8} md={7}>
          <h1 className={'datasetName'}> {name}</h1>
          <p className={'text-muted last-updted'}> Data last updated {days_since_last_update} days ago on {dayUpdated} at {timeUpdated}</p>
        </Col>
        <Col sm={3} md={4} className={'datasetDownLoadButtons'}>
          <ButtonGroup style={{float: 'right', marginTop: '2em'}}>
            <DownloadLinks apiDomain={apiDomain} id={id} dataId={dataId} />
            <Button className={'datasetLinks'} bsStyle='primary' href={`https://dev.socrata.com/foundry/${apiDomain}/${dataId}`} target='_blank'>API Docs</Button>
          </ButtonGroup>
        </Col>
         <Col sm={1} md={1} className={'datasetDownLoadButtons'}></Col>
      </Row>
    )
  }
}

export default DatasetFrontMatter
