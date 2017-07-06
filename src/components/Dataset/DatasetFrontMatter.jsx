import './@Dataset.css'

import React, { Component } from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import DownloadLinks from './DatasetDownloads'
import moment from 'moment'
// '2em'
class DatasetFrontMatter extends Component {
  render () {
    console.log(this.props)
    const { name, id, rowsUpdatedAt, apiDomain, dataId } = this.props
    let days_since_last_update =  String(this.props['days_since_last_updated'])
    let dayUpdated = moment(rowsUpdatedAt).format('MM/DD/YYYY')
    let timeUpdated = moment(rowsUpdatedAt).format('hh:mm A')
    return (
      <div>
      <Row className={'dataSetTitle'} id='header'>
        <Col sm={8} md={8}>
          <Row>
            <Col sm={12} md={12} className={'dataset-menu'}>
              <h1 className={'datasetName'}> {name}</h1>
              <div className={'datasetDownLoadButtons'}>
                <ButtonGroup style={{float: 'left'}}>
                <DownloadLinks apiDomain={apiDomain} id={id} dataId={dataId} />
                <Button className={'datasetLinks'}  bsSize={'small'} bsStyle='primary' href={`https://dev.socrata.com/foundry/${apiDomain}/${dataId}`} target='_blank'>API Docs</Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={5} md={5}></Col>
      </Row>
      <Row>
      <div className={'text-muted last-updted'}> Data last updated {days_since_last_update} days ago on {dayUpdated} at {timeUpdated}</div>
      </Row>
      </div>
    )
  }
}

export default DatasetFrontMatter
