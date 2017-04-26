import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import './_defaultListGroup.scss'

class DefaultListGroup extends Component {

  makeList (ComponentToRender, items, action, iconClick) {
    let content = (<div />)
    if (items) {
      content = items.map((item, index) => (
        <ComponentToRender itemProps={item} key={`item-${index}`} actions={{action}} iconClick={iconClick} />
    ))
    } else {
      content = (<ComponentToRender />)
    }
    return content
  }
  render () {
    console.log('in the default list group')
    const ComponentToRender = this.props.itemComponent
    let items = this.props.items
    let action = this.props.action
    let className = this.props.className
    let iconClick = this.props.iconClick
    let content = this.makeList(ComponentToRender, items, action, iconClick)
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
