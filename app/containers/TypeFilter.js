import React from 'react'
import { connect } from 'react-redux'
import { filterColumnList } from '../actions'
import { getUniqueColumnTypes } from '../reducers'
import DefaultListGroup from '../components/DefaultListGroup'
import FieldTypeButton from '../components/FieldTypeButton'

const TypeFilter = ({items}) => {
  return (
    <DefaultListGroup
      itemComponent={FieldTypeButton}
      className={'ColumnSelector-list-group'}
      items={items}
      onSelectListItem={onFilter}>
    </DefaultListGroup>
  )

const mapStateToProps = (state, ownProps) => ({
  items: getUniqueColumnTypes(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilter: item => dispatch(filterColumnList('typeFilters', item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(TypeFilter)

