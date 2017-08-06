import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMetadata, loadColumnProps, loadTable } from '../actions'
import DatasetFrontMatter from '../components/DatasetFrontMatter'
import DatasetNav from '../components/DatasetNav'
import Loading from '../components/Loading'
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
    // TODO: may be more foolproof to get this by ref
    let height = document.getElementById('DatasetFrontmatter') ? document.getElementById('DatasetFrontmatter').clientHeight : prevState.frontMatterHeight
    let viewportHeight = window.innerHeight
    if (prevState.frontMatterHeight !== height) {
      this.setState({ 
        frontMatterHeight: height,
        topOffset: height + 45 + 65,
        viewportHeight
      })
    }
  }

  render () {
    const { rowsUpdatedAt, name, id, dataId, hasGeo, isFetching, children, ...other } = this.props
    const childrenWithHeight = React.Children.map(children, 
      (child) => React.cloneElement(child, this.state))

    return (
      <Loading isFetching={true} hideChildrenWhileLoading={true} type='centered'>
        <section id={'DatasetFrontmatter'}>
          <DatasetFrontMatter 
            apiDomain={API_DOMAIN} 
            name={name} 
            id={id}
            dataId={dataId}
            rowsUpdatedAt={rowsUpdatedAt} />
        </section>
        <section id={'DatasetNav'}>
          <DatasetNav id={id} dataId={dataId} hasGeo={hasGeo} {...other} />
        </section>
        <section id={'DatasetChildren'} style={{width: '100%', minHeight: '100px'}}>
          {childrenWithHeight}
        </section>
      </Loading>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { rowsUpdatedAt, name, id, dataId, hasGeo, isFetching } = state.metadata
  return {
    name,
    id,
    dataId,
    hasGeo,
    isFetching,
    rowsUpdatedAt
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

