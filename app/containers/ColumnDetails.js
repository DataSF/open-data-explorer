import { connect } from 'react-redux'
import ColumnList from '../components/ColumnList'

const mapStateToProps = (state, ownProps) => {
  const { columnProps } = state
  return {
    list: columnProps.columns
  }
}

export default connect(mapStateToProps)(ColumnList)

