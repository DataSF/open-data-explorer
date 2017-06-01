import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'
import './@DefaultListGroup.css'

const DefaultListGroup = ({itemComponent, className, items, onSelectListItem}) => {
  let content
  let ComponentToRender = itemComponent
  if (items) {
    content = items.length > 0
    ? items.map((item, index) => <ComponentToRender itemProps={item} key={`item-${index}`} onClick={onSelectListItem} />)
    : <div />
  }
  return (
    <ListGroup fill className={className}>
      {content}
    </ListGroup>
  )
}

DefaultListGroup.propTypes = {
  items: PropTypes.array,
  onSelectListItem: PropTypes.func,
  className: PropTypes.string
}

export default DefaultListGroup
