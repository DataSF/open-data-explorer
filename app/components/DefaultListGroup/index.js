import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import './_defaultListGroup.scss'

class DefaultListGroup extends Component {

  makeList (ComponentToRender, items) {
    let content = (<div />)
    if (items) {
      content = items.map((item, index) => (
        <ComponentToRender itemProps={item} key={`item-${index}`} />
    ))
    } else {
      content = (<ComponentToRender />)
    }
    return content
  }
  render () {
    const ComponentToRender = this.props.itemComponent
    let items = this.props.items
    let className = this.props.className
    let content = this.makeList(ComponentToRender, items)
    return (
      <ListGroup fill className={className}>
        {content}
      </ListGroup>
    )
  }
}

DefaultListGroup.propTypes = {
  itemComponent: React.PropTypes.func.isRequired,
  items: React.PropTypes.array
}
export default DefaultListGroup
