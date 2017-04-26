import React from 'react'
import { connect } from 'react-redux'
import { filterColumnList } from '../actions'
import { getUniqueColumnTypes } from '../reducers'
import DefaultListGroup from '../components/DefaultListGroup'
import FieldTypeButton from '../components/FieldTypeButton'

const TypeFilter = ({items, onFilter}) => (
  <DefaultListGroup
    itemComponent={FieldTypeButton}
    className={'default-list-group'}
    items={items}
    onSelectListItem={onFilter} />
)

const mapStateToProps = (state, ownProps) => ({
  items: getUniqueColumnTypes(state, true)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilter: item => dispatch(filterColumnList('typeFilters', item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(TypeFilter)

