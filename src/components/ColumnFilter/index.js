import './@ColumnFilter.css'
import React, { PropTypes } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

// To do: remove this in favor of passing icon components in below
const ICONS = {
  'text': 'fa-keyboard-o',
  'date': 'fa-calendar',
  'number': 'fa-list-ol',
  'location': 'fa-globe',
  'boolean': 'fa-check'
}

const FilterButton = ({label, icon, onFilter, filters}) => {
  const handleOnFilter = () => {
    onFilter(label)
  }
  return (
    <Button bsStyle='info' onClick={handleOnFilter}>
      <i className={icon} aria-hidden='true'>
        <span className='sr-only'>{label}</span>
      </i>
    </Button>
  )
}

FilterButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired
}

const ColumnFilter = ({items, onFilter, filters}) => {
  let filterButtons = items.map(({label}, idx) => {
    let icon = 'fa ' + ICONS[label]
    return <FilterButton key={idx} label={label} icon={icon} onFilter={onFilter} filters={filters} />
  })
  return (
    <div className={'ColumnFilter'}>
      <div className={'ColumnFilter__title'}>
        <strong>Filter by type</strong>
      </div>
      <ButtonGroup>
        {filterButtons}
      </ButtonGroup>
    </div>
  )
}

ColumnFilter.propTypes = {
  items: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  filters: PropTypes.array
}

export default ColumnFilter
