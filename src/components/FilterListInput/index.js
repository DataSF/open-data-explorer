import React from 'react'
import { FormControl } from 'react-bootstrap'
import './@FilterListInput.css'

const FilterListInput = ({onFilter, searchValue}) => {
  let handleFilter = e => {
    onFilter(e.target.value)
  }
  return (<FormControl className='FilterListInput' type='text' defaultValue={searchValue} placeholder='Search within this list...' onChange={handleFilter.bind(this)} />)
}

export default FilterListInput
