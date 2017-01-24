import { connect } from 'react-redux'
import DatasetDetails from '../components/Dataset/DatasetDetails'

const mapStateToProps = (state, ownProps) => {
  const { metadata, columnProps } = state
  return {
    metadata,
    columns: columnProps.columns
  }
}

export default connect(mapStateToProps)(DatasetDetails)

