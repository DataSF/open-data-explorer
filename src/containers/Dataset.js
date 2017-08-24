import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMetadata, loadColumnProps, loadTable, download, outboundLink } from '../actions'
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
      topOffset: 160,
      chartTitleHeight: 35
    }

    this._calculateViewport = this._calculateViewport.bind(this)
  }

  componentWillMount () {
    this.props.onLoad()
  }

  componentDidMount () {
    window.addEventListener('resize', this._calculateViewport)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._calculateViewport)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      nextProps.onLoad()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    let height = document.getElementById('DatasetFrontmatter') ? document.getElementById('DatasetFrontmatter').clientHeight : prevState.frontMatterHeight
    let chartTitleHeight = document.getElementsByClassName('Chart__tile')[0] ? document.getElementsByClassName('Chart__tile')[0].clientHeight : prevState.chartTitleHeight
    let viewportHeight = window.innerHeight
    if (prevState.frontMatterHeight !== height || prevState.chartTitleHeight !== chartTitleHeight) {
      this.setState({ 
        frontMatterHeight: height,
        topOffset: height + 45 + 65,
        viewportHeight,
        chartTitleHeight,
      })
    }
  }

  _calculateViewport () {
    console.log('calculateViewport')
    let viewportHeight = window.innerHeight
    this.setState({ 
      viewportHeight
    })
  }

  render () {
    console.log('render')
    const { rowsUpdatedAt, name, id, dataId, hasGeo, isFetching, children, onDownload, onOutboundLink, ...other } = this.props
    const childrenWithDatasetProps = React.Children.map(children, (child) => React.cloneElement(child, {...this.state, name}))
    return (
      <Loading isFetching={isFetching} hideChildrenWhileLoading={true} type='centered'>
        <section id={'DatasetFrontmatter'}>
          <DatasetFrontMatter 
            apiDomain={API_DOMAIN} 
            name={name} 
            id={id}
            dataId={dataId}
            rowsUpdatedAt={rowsUpdatedAt} />
        </section>
        <section id={'DatasetNav'}>
          <DatasetNav 
            id={id} 
            dataId={dataId} 
            hasGeo={hasGeo} 
            onDownload={onDownload} 
            onOutboundLink={onOutboundLink} 
            {...other} />
        </section>
        <section id={'DatasetChildren'} style={{width: '100%', minHeight: '100px'}}>
          {childrenWithDatasetProps}
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

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onLoad: () => dispatch(loadMetadata(ownProps.params.id)),
    loadColumnProps: () => dispatch(loadColumnProps()),
    loadTable: () => dispatch(loadTable()),
    onDownload: (link, type) => dispatch(download(link, type)),
    onOutboundLink: (link) => dispatch(outboundLink(link))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dataset)

