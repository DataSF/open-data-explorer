import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ColumnList from '../components/ColumnList'
import ColumnFilter from '../components/ColumnFilter'
import ColumnSort from '../components/ColumnSort'
import { getUniqueColumnTypes } from '../reducers'
import { filterColumnList, sortColumnList } from '../actions'

const ColumnDetails = ({list, filter, filterTypes, onFilter, sort, onSort}) => (
  <Row>
    <Col md={8}>
      <ColumnFilter filterTypes={filterTypes} onFilter={onFilter} filter={filter} />
      <ColumnSort sort={sort} onSort={onSort} />
      <ColumnList list={list} filter={filter} sort={sort} />
    </Col>
  </Row>
)

const mapStateToProps = (state, ownProps) => {
  const { columnProps } = state
  return {
    list: columnProps.columns || {},
    filterTypes: getUniqueColumnTypes(state),
    filter: columnProps.filter,
    sort: columnProps.sort
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilter: (type) => {
      return dispatch(filterColumnList(type))
    },
    onSort: (sort) => {
      return dispatch(sortColumnList(sort))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnDetails)

