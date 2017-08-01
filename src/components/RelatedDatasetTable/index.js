import RelatedDatasetLink from '../RelatedDatasetLink'
import React, { Component } from 'react'
import './@RelatedDatasetTable.css'
class RelatedDatasetTable extends Component {



  makeRelatedDatasetLinks (relatedDatasets) {
    let relatedDatasetLinks = relatedDatasets.map(function (relatedDataset) {
      return (
        <RelatedDatasetLink relatedDataset={relatedDataset} />
      )
    })
    return relatedDatasetLinks
  }

  makeRelatedDatasetTableRow (relatedDatasets) {
    let relatedDatasetLinkRows = []
    relatedDatasets.forEach(function(relatedDatasetDept){
      let relatedDeptLinks = relatedDatasetDept.links.map(function (relatedDataset) {
        return (
          <RelatedDatasetLink key={Math.random()} relatedDataset={relatedDataset} />
        )
      })
      let deptRow = (

       <tr key={Math.random()} className={'related-links-tbl-row'}>
          <td className={'related-link-dept'}>{relatedDatasetDept.dept}</td>
          <td className={'related-link-dept-list'}>{relatedDeptLinks}</td>
        </tr>
      )
      relatedDatasetLinkRows.push(deptRow)
    })
    return relatedDatasetLinkRows
  }


  render () {

  let { relatedDatasets, relatedDatasetCnt } = this.props
  let relatedDatasetLinkRows
  if( relatedDatasets){
      relatedDatasetLinkRows =  this.makeRelatedDatasetTableRow (relatedDatasets)

  }

  return(
      <div>
        <div className={'related-dataset-links-header'}>
             {'Related Datasets ('}  {relatedDatasetCnt}  {')'}
        </div>
        <table className={'related-links-tbl'}>
        <tbody>
          {relatedDatasetLinkRows}
          </tbody>
        </table>
         <div className={'overview-description-breakline'}></div>
      </div>
    )
  }
}

export default RelatedDatasetTable
