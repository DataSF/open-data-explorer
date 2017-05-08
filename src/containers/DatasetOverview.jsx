import { connect } from 'react-redux'
import DatasetOverview from '../components/Dataset/DatasetOverview'

const mapStateToProps = (state, ownProps) => {
  const { metadata } = state
  return {
    metadata
  }
}

export default connect(mapStateToProps)(DatasetOverview)
