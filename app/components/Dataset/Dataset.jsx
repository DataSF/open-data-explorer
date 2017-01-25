import React, { Component } from 'react'
import DatasetFrontMatter from './DatasetFrontMatter'
import DatasetNav from './DatasetNav'
import { API_DOMAIN } from '../../constants/AppConstants'

class Dataset extends Component {

  componentWillMount () {
    this.props.onLoad().then(() => {
      this.props.loadColumnProps()
    })
  }

  render () {
    const { metadata, children, ...other } = this.props
    console.log(metadata)
    return (
      <section id={'Dataset'}>
        <div className='container-fluid datasetContainer'>
          <DatasetFrontMatter apiDomain={API_DOMAIN} {...metadata} />
          <DatasetNav {...other} />
          {children}
        </div>
      </section>
    )
  }
}

export default Dataset
