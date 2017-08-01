// import './@RelatedDatasetLink.css'

import React, { Component } from 'react'
import {  OverlayTrigger, Popover } from 'react-bootstrap'
import { Link } from 'react-router'
import slugify from 'underscore.string/slugify'

class RelatedDatasetLink extends Component {

   makeRelatedDatasetPopover (relatedDataset) {
    let popOverId = 'related-dataset-info-' + String(Math.random())
    return (
       <Popover
       id ={ popOverId}
        title={ relatedDataset.dataset_name}>
        <div className={'popover-relateddataset-container'}>
          <div className={'popover-relateddataset-info'}>{'Department: '}{relatedDataset.department}</div>
          <div className={'popover-relateddataset-info'}>{'Description: '}{relatedDataset.description}</div>
          <div className={'popover-relateddataset-info'}>{'Tags: '}{relatedDataset.keywords}</div>

        </div>
      </Popover>
    )
  }

  makeLink(relatedDataset, popOverStuff){
    return (
     <OverlayTrigger
        key={Math.random()}
        trigger={['hover', 'focus']}
        placement={'right'}
        overlay={popOverStuff}>
          <Link className={'related-dataset-link'} to={`${'/' + slugify(relatedDataset.category) + '/' + slugify(relatedDataset.dataset_name) + '/' + relatedDataset.datasetid}`} >
            {relatedDataset.dataset_name}
          </Link>
      </OverlayTrigger>
    )
  }

  render () {
    let { relatedDataset } = this.props

    let popOverStuff = this.makeRelatedDatasetPopover(relatedDataset)
    let link = this.makeLink(relatedDataset, popOverStuff)
    return (
        <div className={'related-dataset-link-area'}>
          {link}
        </div>

    )
  }
}

export default RelatedDatasetLink
