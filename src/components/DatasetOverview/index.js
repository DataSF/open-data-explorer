import './@DatasetOverview.css'

import React, { Component } from 'react'
import { Row, Col, OverlayTrigger, Popover } from 'react-bootstrap'
import RelatedDatasetTable from '../RelatedDatasetTable'
import { setDocumentTitle } from '../../helpers'


class DatasetOverview extends Component {

  renderAttachmentsList (attachments, id) {
    let attachmentList
    if(attachments){
      attachmentList = attachments.map((att, idx, array) => {
      return (
        <li className={'overview-attachment-list'} key={idx}>
          <a href={att.url}>
            {att.name}
          </a>
        </li>)
      })
    }
    return attachmentList
  }
  makeDatasetFactsTable (factItems, classNameTdHead, classNameTdValue) {
    let factItemsLst = factItems.map(function (factItem) {
      return (
        <tr  key={Math.random()}>
          <td className={classNameTdHead}>{factItem.header}</td>
          <td className={classNameTdValue}>{factItem.value}</td>
        </tr>
      )
    })
    return factItemsLst
  }

  renderPublishingInfo( publishing_faqs ) {
    let publishingFaqsList = publishing_faqs.map(function(publishing_faq){
      let textStuff = publishing_faq.header + ": " + publishing_faq.value
      return (
        <li key={Math.random()} className={'overview-publishing-details-items'}>
          {textStuff}
        </li>
      )
    })
    return publishingFaqsList
  }
  renderPublishingHealthPopover(){
    return (
      <Popover
        id={'popover-overview-publishing-health'}
        title={'Publishing Health'}>
         <div className={'popover-overview-publishing-health-container'}>
          <div className={'popover-overview-publishing-health-title'}>
            {'The publishing health indicates whether or not a dataset is being updated as specified by its publishing schedule'}
          <div className={'popover-overview-publishing-health-items'}><span className={'overview-publishing-health-healthy overview-publishing-health-popover'}> {'On time'} </span> {'- indicates that dataset updated on time' }</div>
          <div className={'popover-overview-publishing-health-items'}><span className={'overview-publishing-health-delayed overview-publishing-health-popover'}> {'Delayed'} </span> {'- indicates that dataset is late to update' }</div>
          <div className={'popover-overview-publishing-health-items'}><span className={'overview-publishing-health-stale overview-publishing-health-popover'}> {'Stale'} </span> {'- indicates that dataset has not been updated in more than two times the time period indicated in publishing frequency'}</div>
          </div>
         </div>
      </Popover>
    )
  }
  renderPublishingHealthSpan (publishing_health) {
    let cssName = 'overview-publishing-health overview-publishing-health-' + publishing_health.className
    let popOverStuff = this.renderPublishingHealthPopover()
    return (
      <OverlayTrigger
        key={Math.random()}
        trigger={['hover', 'focus']}
        placement={'right'}
        overlay={popOverStuff}>
        <li className={'overview-publishing-details-items'}>
          {'Publishing Health: '}
          <span className={cssName}> {publishing_health.value} </span>
        </li>
      </OverlayTrigger>
    )
  }
  
  render () {
    const { datasetFacts, colCounts, publishing_health, publishing_faqs, name } = this.props
    const { id, description, publishingDepartment, licenseLink, licenseName, notes, attachments, programLink, relatedDatasets, relatedDatasetCnt} = this.props.metadata
    let attachmentList = this.renderAttachmentsList( attachments, id)
    let datasetFactsTbl =  this.makeDatasetFactsTable(datasetFacts, 'overview-dataset-facts-td', 'overview-dataset-facts-td')
    let datasetFieldCntTbl = this.makeDatasetFactsTable(colCounts, 'overview-dataset-facts-td',  'overview-dataset-cnts-td-value')
    let publishingHealthSpan = [this.renderPublishingHealthSpan(publishing_health)]
    let publishingFaqItems =  publishingHealthSpan.concat(this.renderPublishingInfo( publishing_faqs ) )
    let descriptionNoCR = description ? description.replace(/\r/g, '') : ''
    let descPara = description ? descriptionNoCR.split('\n\n').map((paragraph, idx) => <p key={'description_'+idx}>{paragraph}</p>) : null

    if(name) {
      setDocumentTitle(name + ' | Overview')
    }

      if (this.props.metadata) {
      // assemble related documents
      let documents = []
      // let tagList = null
      if (notes || attachments || programLink) documents.push(<h2 key='title'>Notes and Supporting Documentation</h2>)
      if (notes) documents.push(<p key='notes'>{notes}</p>)
      if (programLink) documents.push(<p key='programLink'><a href={programLink} target={'_blank'}>Learn more about the program</a> related to this dataset</p>)
      if (attachments) {
        documents.push(<h3 key={'doc-title'} className={'text-muted'}>Documents</h3>)
        documents.push(
          <ul key='attachments' className={'list-group'}>
            {attachmentList}
          </ul>
          )
      }

    }
    return (
      <div className={'container overview'}>
        <div className={'overview-description'}>
          {descPara}
          <Choose>
            <When condition={notes}>
              <p>
                {notes}
              </p>
            </When>
          </Choose>
          <Choose>
            <When condition={attachments}>
              <div className={'overview-attachments'}>
                <div className={'overview-attachments-header'}>
                  <span style={{ 'color': '#939393'}}>
                    {'Related Documents '}
                    <span className={'glyphicon glyphicon-folder-open'}></span>
                  </span>
                </div>
                <ul>
                  {attachmentList}
                </ul>
              </div>
            </When>
          </Choose>
        </div>
        <div className={'overview-description-breakline'}></div>
        <div className={'overview-department-license'}>
          {'Data published by '} <span style={{ 'fontWeight': 600,
            color: '#939393', 'fontSize': '22px'}}>{publishingDepartment}</span>
          {' under the '} <a href={licenseLink}>{licenseName}</a>
        </div>
        <div className={'overview-description-breakline'}></div>
        <Row className={'overview-extended-content'}>
          <Col sm={5} className={'overview-table-info'}>
            <div className={'overview-table-dataset-facts'}>
              <div className={'overview-table-info-header'}>
                {'Dataset Facts'}
              </div>
              <table className={'overview-table-info-dataset-facts'}>
                 <tbody>
                {datasetFactsTbl}
                </tbody>
              </table>
            </div>
            <div className={'overview-table-dataset-field-cnts'}>
              <div className={'overview-table-info-header'}>
                { 'Whats Inside This Dataset'}
              </div>
              <table className={'overview-table-info-dataset-facts'}>
                <tbody>
                  {datasetFieldCntTbl}
                </tbody>
              </table>
            </div>
          </Col>
          <Col sm={6} className={'overview-publishing-details'}>
            <div className={'overview-publishing-details-area'}>
              <div className={'overview-publishing-details-title'}>
                {'Publishing Details'}
              </div>
              <div className={'overview-publishing-details-items'}>
                <ul className={'overview-publishing-details-items-list'}>
                  {publishingFaqItems}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Choose>
          <When condition={relatedDatasets && relatedDatasets.length !== 0}>
            <Row>
              <div className={'overview-description-breakline'}></div>
              <Col sm={12} className={'overview-publishing-details'}>
                <RelatedDatasetTable className={'related-dataset-overview-table'}
                  relatedDatasets={relatedDatasets}
                  relatedDatasetCnt={relatedDatasetCnt} />
              </Col>
            </Row>
          </When>
        </Choose>
      </div>

    )
  }
}

export default DatasetOverview

// https://data.sfgov.org/api/views/wv5m-vpq2/files/3360189c-38b9-48bd-ac1c-1b39a8353662?download=true&filename=ASR-0001_DataDictionary_historic-secured-property-rolls.xlsx
