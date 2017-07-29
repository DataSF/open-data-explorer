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
  metadata.id = metadata.datasetId
  return {
    metadata
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadRelatedDatasets: () => {
      return dispatch(loadRelatedDatasets())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetOverview)
