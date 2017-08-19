import './@Dataset.css'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
// '2em'
const DatasetFrontMatter = ({name, id, rowsUpdatedAt, apiDomain, dataId}) => {
  let timeAgo = moment.utc(rowsUpdatedAt).local().fromNow()
  return (
    <div className='container'>
      <Row className={'dataSetTitle'} id='header'>
        <Col sm={12} md={12}>
          <h1 className={'datasetName'}> {name}</h1>
          <div className={'last-updated'}> Data last updated {timeAgo}</div>
        </Col>
      </Row>
    </div>
  )
}

export default DatasetFrontMatter
