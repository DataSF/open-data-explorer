import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ColumnList from '../components/ColumnList'
import ColumnFilter from '../components/ColumnFilter'
import { getUniqueColumnTypes } from '../reducers'
import { filterColumnList } from '../actions'

const ColumnDetails = ({list, filter, filterTypes, onFilter}) => (
  <Row>
    <Col md={8}>
      <ColumnFilter filterTypes={filterTypes} onFilter={onFilter} filter={filter} />
      <ColumnList list={list} filter={filter} />
    </Col>
  </Row>
)

const mapStateToProps = (state, ownProps) => {
  const { columnProps } = state
  return {
    list: columnProps.columns || {},
    filterTypes: getUniqueColumnTypes(state),
    filter: columnProps.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilter: (type) => {
      return dispatch(filterColumnList(type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnDetails)

