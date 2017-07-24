import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMetadata, loadColumnProps, loadTable } from '../actions'
import DatasetFrontMatter from '../components/DatasetFrontMatter'
import DatasetNav from '../components/DatasetNav'
import { API_DOMAIN } from '../constants/AppConstants'

class Dataset extends Component {

  componentWillMount () {
    this.props.onLoad()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      nextProps.onLoad()
    }
  }

  render () {
    const { metadata, children, ...other } = this.props
    return (
      <div>
        <section id={'DatasetFrontmatter'}>
          <DatasetFrontMatter apiDomain={API_DOMAIN} {...metadata} />
        </section>
        <section id={'DatasetNav'}>
          <DatasetNav id={metadata.id} dataId={metadata.dataId} hasGeo={metadata.hasGeo} {...other} />
        </section>
        <section id={'DatasetChildren'}>
          {children}
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { metadata } = state
  return {
    metadata
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      return dispatch(loadMetadata(ownProps.params.id))
    },
    loadColumnProps: () => {
      return dispatch(loadColumnProps())
    },
    loadTable: () => {
      return dispatch(loadTable())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dataset)

