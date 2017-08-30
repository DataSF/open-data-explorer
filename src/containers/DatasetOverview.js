import React from 'react'
import { connect } from 'react-redux'
import DatasetOverview from '../components/DatasetOverview'
import { makeDatasetFactDictFxn, makeColTypesCntFxn, makePublishingFactsFxn, calculatePublishingHealthFxn } from '../reducers'
import { loadRelatedDatasets } from '../actions'

class DatasetOverviewContainer extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.metadata !== this.props.metadata
  }

  render () {
    return <DatasetOverview {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const { metadata } = state
  return {
    metadata,
    datasetFacts: makeDatasetFactDictFxn(state),
    colCounts: makeColTypesCntFxn(state),
    publishingFacts: makePublishingFactsFxn(state),
    publishing_health: calculatePublishingHealthFxn(state),
    publishing_faqs: makePublishingFactsFxn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadRelatedDatasets: (fbf) => {
      return dispatch(loadRelatedDatasets(fbf))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetOverviewContainer)
