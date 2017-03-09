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

  componentWillReceiveProps (nextProps) {
    console.log('receiving props')
    console.log(this.props.params.id)
    console.log(nextProps.params.id)
    if (this.props.params.id !== nextProps.params.id) {
      nextProps.onLoad().then(() => {
        nextProps.loadColumnProps()
      })
    }
  }

  render () {
    console.log('render')
    const { metadata, children, ...other } = this.props
    return (
      <section id={'Dataset'}>
        <div className='container-fluid'>
          <DatasetFrontMatter apiDomain={API_DOMAIN} {...metadata} />
          <DatasetNav {...other} />
          {children}
        </div>
      </section>
    )
  }
}

export default Dataset
