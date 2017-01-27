import './_ColumnFilter.scss'
import React, { PropTypes } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

// To do: remove this in favor of passing icon components in below
const ICONS = {
  'text': 'fa-keyboard-o',
  'date': 'fa-calendar',
  'number': 'fa-list-ol',
  'location': 'fa-globe',
  'checkbox': 'fa-check'
}

const FilterButton = ({type, icon, onFilter, filter}) => {
  const handleOnFilter = () => {
    if (filter === type) {
      type = ''
    }
    onFilter(type)
  }
  return (
    <Button bsStyle='info' bsSize='md' onClick={handleOnFilter}>
      <i className={icon} aria-hidden='true'>
        <span className='sr-only'>{type}</span>
      </i>
    </Button>
  )
}

FilterButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired
}

const ColumnFilter = ({filterTypes, onFilter, filter}) => {
  let filterButtons = filterTypes.map((type, idx) => {
    let icon = 'fa ' + ICONS[type]
    return <FilterButton key={idx} type={type} icon={icon} onFilter={onFilter} filter={filter} />
  })
  return (
    <div className={'ColumnFilter-container'}>
      <strong>Filter by type</strong>
      <div>
        <ButtonGroup>
          {filterButtons}
        </ButtonGroup>
      </div>
    </div>
  )
}

ColumnFilter.propTypes = {
  filterTypes: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string
}

export default ColumnFilter
