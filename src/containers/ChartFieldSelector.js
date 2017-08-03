import { connect } from 'react-redux'
import { filterColumnList, selectColumn, setHideShow} from '../actions'
import { getUniqueColumnTypes, getSelectableColumns, getSelectedField } from '../reducers'

import FieldSelector from '../components/FieldSelector'

const mapStateToProps = (state, ownProps) => ({
  types: getUniqueColumnTypes(state, true),
  selectableColumns: getSelectableColumns(state),
  selectedField: getSelectedField(state),
  title: getSelectedField(state).length > 0 ? 'Selected field' : 'Select a field',
  hideshowVal: getSelectableColumns(state).length,
  showCols: state.columnProps.showCols
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilterTypes: item => dispatch(filterColumnList('typeFilters', item, 'columnProps')),
  onFilterList: item => dispatch(filterColumnList('fieldNameFilter', item, 'columnProps')),
  onSelectColumn: (key) => dispatch(selectColumn(key)),
  setHideShow: showCols => dispatch(setHideShow(showCols, 'columnProps')),
  resetState: resetState => dispatch(resetState('columnProps'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(FieldSelector)

