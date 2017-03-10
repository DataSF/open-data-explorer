import React from 'react'
import { connect } from 'react-redux'
import { filterColumnList } from '../actions'
import { getUniqueColumnTypes } from '../reducers'

const TypeFilter = (props) => {
  const handleOnFilter = () => {
    props.onFilter('location')
  }

  console.log(props)
  return <div />
}

const mapStateToProps = (state, ownProps) => ({
  items: getUniqueColumnTypes(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilter: item => dispatch(filterColumnList(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(TypeFilter)

