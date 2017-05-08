import React from 'react'
import { FormControl } from 'react-bootstrap'

const FilterListInput = ({onFilter}) => {
  let handleFilter = e => {
    onFilter(e.target.value)
  }
  return (<FormControl type='text' placeholder='Filter within this list...' onChange={handleFilter.bind(this)} />)
}

export default FilterListInput
