import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMetadata, loadColumnProps, loadTable } from '../actions'
import DatasetFrontMatter from '../components/DatasetFrontMatter'
import DatasetNav from '../components/DatasetNav'
import { API_DOMAIN } from '../constants/AppConstants'

class Dataset extends Component {

  constructor(props) {
    super(props)

    // to capture height of sub-component
    this.state = {
      frontMatterHeight: 50,
      topOffset: 160
    }
  }

  componentWillMount () {
    this.props.onLoad()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      nextProps.onLoad()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    let height = document.getElementById('DatasetFrontmatter').clientHeight
    if (prevState.frontMatterHeight !== height) {
      this.setState({ 
        frontMatterHeight: height,
        topOffset: height + 45 + 65
      })
    }
  }

  render () {
    const { metadata, children, ...other } = this.props
    const childrenWithHeight = React.Children.map(children, 
      (child) => React.cloneElement(child, this.state))
    return (
      <div>
        <section id={'DatasetFrontmatter'}>
          <DatasetFrontMatter apiDomain={API_DOMAIN} {...metadata} />
        </section>
        <section id={'DatasetNav'}>
          <DatasetNav id={metadata.id} dataId={metadata.dataId} hasGeo={metadata.hasGeo} {...other} />
        </section>
        <section id={'DatasetChildren'}>
          {childrenWithHeight}
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

