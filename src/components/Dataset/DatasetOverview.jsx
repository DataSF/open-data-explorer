import './@DatasetOverview.css'

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { format } from 'd3'
import {unix} from 'moment'

class DatasetOverview extends Component {
  renderAttachmentsList () {
    let { attachments, id } = this.props.metadata

    let attachmentList = attachments.map((att, idx, array) => {
      return (
        <li className={'list-group-item'}>
          <a href={'https://data.sfgov.org/api/views/' + id + '/files/' + att.assetId + '?download=true&filename=' + att.filename}>
            {att.name}
          </a>
        </li>)
    })

    return attachmentList
  }

  render () {
    const { description, publishingDepartment, licenseLink, licenseName, rowCount, rowsUpdatedAt, publishingFrequency, notes, attachments, programLink, tags } = this.props.metadata
    let numberFormat = format(',')
    let dayUpdated = unix(rowsUpdatedAt).format('MM/DD/YYYY')
    let timeUpdated = unix(rowsUpdatedAt).format('hh:mm A')
    let overviewContent = null

    if (this.props.metadata) {
      // assemble related documents
      let documents = []
      let tagList = null
      if (notes || attachments || programLink) documents.push(<h2 key='title'>Notes and Supporting Documentation</h2>)
      if (notes) documents.push(<p key='notes'>{notes}</p>)
      if (programLink) documents.push(<p key='programLink'><a href={programLink} target={'_blank'}>Learn more about the program</a> related to this dataset</p>)
      if (attachments) {
        documents.push(<h3 key={'doc-title'} className={'text-muted'}>Documents</h3>)
        documents.push(
          <ul key='attachments' className={'list-group'}>
            {this.renderAttachmentsList()}
          </ul>
          )
      }

      // join tags with comma
      if (tags) {
        tagList = (
          <div>
            <h3 className={'text-muted'}>Tags</h3>
            <p>{tags.join(', ')}</p>
          </div>
          )
      }

      overviewContent = (
        <Row id='DatasetOverview-description' className='DatasetOverview'>
          <Col sm={7} className={'description'}>
            <h2>Description</h2>
            <p>{description}</p>
            <h2>Publishing Health</h2>
            <p>This data should be <b>updated {publishingFrequency ? publishingFrequency.toLowerCase() : ''}</b>. It was last updated on {dayUpdated} at {timeUpdated}</p>
            {documents}
          </Col>
          <Col sm={5} className={'dataSetInfo'}>
            <h2>Additional Information</h2>
            <h3 className={'text-muted'}>Publishing Department</h3>
            <p>{publishingDepartment}</p>
            <h3 className={'text-muted'}>License</h3>
            <p><a href={licenseLink}>{licenseName}</a></p>
            <h3 className={'text-muted'}>Number of Rows</h3>
            <p>{numberFormat(parseInt(rowCount, 10))}</p>
            {tagList}
          </Col>
        </Row>
      )
    }
    return overviewContent
  }
}

export default DatasetOverview

// https://data.sfgov.org/api/views/wv5m-vpq2/files/3360189c-38b9-48bd-ac1c-1b39a8353662?download=true&filename=ASR-0001_DataDictionary_historic-secured-property-rolls.xlsx
