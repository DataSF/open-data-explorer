import React from 'react'
import { connect } from 'react-redux'
import { filterColumnList } from '../actions'
import FilterListInput from '../components/FilterListInput'

const FieldNameFilter = ({onFilter}) => (
  <FilterListInput onFilter={onFilter} />
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilter: item => dispatch(filterColumnList('fieldNameFilter', item))
})

export default connect(
  null,
  mapDispatchToProps)(FieldNameFilter)

