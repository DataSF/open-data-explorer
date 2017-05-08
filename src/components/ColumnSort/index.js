import './_ColumnSort.scss'

import React, { PropTypes } from 'react'
import { ControlLabel, FormControl } from 'react-bootstrap'

const ColumnSort = ({onSort, sort}) => {
  const handleOnSelect = (e) => {
    onSort(e.target.value)
  }

  return (<div className='ColumnSort-container'>
    <ControlLabel>Sort by</ControlLabel>
    <FormControl componentClass='select' placeholder='select' onChange={handleOnSelect} value={sort}>
      <option value='name'>Name</option>
      <option value='type'>Type</option>
    </FormControl>
  </div>
  )
}

ColumnSort.propTypes = {
  onSort: PropTypes.func.isRequired,
  sort: PropTypes.string
}

export default ColumnSort
