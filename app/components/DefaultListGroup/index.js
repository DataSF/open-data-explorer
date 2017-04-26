import React from 'react'
import { ListGroup } from 'react-bootstrap'
import './_defaultListGroup.scss'

const DefaultListGroup = ({itemComponent, className, items, onSelectListItem}) => {
  let ComponentToRender = itemComponent
  let content = items.length > 0
    ? items.map((item, index) => <ComponentToRender itemProps={item} key={`item-${index}`} onClick={onSelectListItem} />)
    : <div />

  return (
    <ListGroup fill className={className}>
      {content}
    </ListGroup>
  )
}

DefaultListGroup.propTypes = {
  itemComponent: React.PropTypes.func.isRequired,
  items: React.PropTypes.array,
  onSelectListItem: React.PropTypes.func,
  className: React.PropTypes.string
}

export default DefaultListGroup
