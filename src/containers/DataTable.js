import { connect } from 'react-redux'
import { loadTable, sortColumn, updatePage } from '../actions'
import DataTable from '../components/Table'

const mapStateToProps = (state, ownProps) => {
  const { table, columnProps, metadata } = state
  return {
    table,
    columns: columnProps.columns,
    rowCount: metadata.rowCount,
    viewportHeight: ownProps.viewportHeight
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
