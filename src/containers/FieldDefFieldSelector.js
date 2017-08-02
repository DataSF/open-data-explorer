import { connect } from 'react-redux'
import { filterColumnList, selectField, setHideShow} from '../actions'
import { getUniqueColumnTypesDetails, getSelectableColumnsDetails, getSelectedFieldDetails } from '../reducers'

import FieldSelector from '../components/FieldSelector'

const mapStateToProps = (state, ownProps) => ({
  types: getUniqueColumnTypesDetails(state, true),
  selectableColumns: getSelectableColumnsDetails(state),
  selectedField: getSelectedFieldDetails(state),
  title: getSelectedFieldDetails(state).length > 0 ? 'Selected field' : 'Select a field',
  hideshowVal: getSelectableColumnsDetails(state).length,
  showCols: state.fieldDetailsProps.showCols
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilterTypes: item => dispatch(filterColumnList('typeFilters', item, 'fieldDetailsProps')),
  onFilterList: item => dispatch(filterColumnList('fieldNameFilter', item, 'fieldDetailsProps')),
  onSelectColumn: (key) => dispatch(selectField(key)),
  setHideShow: showCols => dispatch(setHideShow(showCols, 'fieldDetailsProps')),
  resetState: resetState => dispatch(resetState('fieldDetailsProps'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(FieldSelector)

