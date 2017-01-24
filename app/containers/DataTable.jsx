import { connect } from 'react-redux'
import { loadTable, sortColumn, updatePage } from '../actions'
import DataTable from '../components/Table/DataTable'

const mapStateToProps = (state, ownProps) => {
  const { metadata, columnProps } = state
  return {
    metadata,
    columns: columnProps.columns
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadTable: () => {
      return dispatch(loadTable())
    },
    sortColumn: (key, dir) => {
      return dispatch(sortColumn(key, dir))
    },
    updatePage: (page) => {
      return dispatch(updatePage(page))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable)
