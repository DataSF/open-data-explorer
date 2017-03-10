import React, { Component } from 'react'
import {ListGroupItem} from 'react-bootstrap'
import './_defaultListGroupItem.scss'

class DefaultListGroupItem extends Component {
  render () {
    const {itemProps} = this.props
    let onClick
    if (itemProps.hasOwnProperty('itemPropsFunction')) {
      onClick = itemProps.actionFxn.bind(this, itemProps.actionFxnParams)
    }
    return (
      <ListGroupItem className={itemProps.className}
        onClick={onClick}>
        {itemProps.label}
        <Choose>
          <When condition={itemProps.hasOwnProperty('otherComponents')}>
            {itemProps.otherComponents}
          </When>
        </Choose>

      </ListGroupItem>
    )
  }
}
DefaultListGroupItem.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default DefaultListGroupItem

