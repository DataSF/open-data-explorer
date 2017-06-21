import React from 'react'
import { connect } from 'react-redux'
import { filterColumnList } from '../actions'
import FilterListInput from '../components/FilterListInput'

const FieldNameFilterDetails = ({onFilter}) => (
  <FilterListInput onFilter={onFilter} />
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilter: item => dispatch(filterColumnList('fieldNameFilter', item, 'fieldDetailsProps'))
})

export default connect(
  null,
  mapDispatchToProps)(FieldNameFilterDetails)

