import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'
import './@DefaultListGroup.css'

const DefaultListGroup = ({itemComponent, className, items, onSelectListItem, popOverPlacement}) => {
  let content
  let hoverSide = popOverPlacement ? popOverPlacement : 'left'
  let ComponentToRender = itemComponent
  if (items) {
    content = items.length > 0
    ? items.map((item, index) => <ComponentToRender itemProps={item} key={`item-${index}`} onClick={onSelectListItem} hoverSide={hoverSide} />)
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
