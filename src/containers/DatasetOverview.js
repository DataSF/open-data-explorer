import { connect } from 'react-redux'
import DatasetOverview from '../components/DatasetOverview'
import { makeDatasetFactDictFxn, makeColTypesCntFxn, makePublishingFactsFxn, calculatePublishingHealthFxn } from '../reducers'
import { loadRelatedDatasets } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const { metadata } = state
  metadata.datasetFacts = makeDatasetFactDictFxn(state)
  metadata.colCounts = makeColTypesCntFxn(state)
  metadata.publishingFacts = makePublishingFactsFxn(state)
  metadata.publishing_health = calculatePublishingHealthFxn(state)
  metadata.publishing_faqs = makePublishingFactsFxn(state)
  if (state.routing.locationBeforeTransitions.pathname) {
    let route = state.routing.locationBeforeTransitions.pathname.split("/")
    metadata.fbf = route[route.length-1]
  }
  return {
    metadata
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
)(DatasetOverview)
