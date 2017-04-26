import React, { Component } from 'react'
import {ListGroupItem} from 'react-bootstrap'
import './_defaultListGroupItem.scss'

class DefaultListGroupItem extends Component {
  render () {
    let {itemProps, onClick} = this.props
    let handleOnClick = typeof onClick === 'function'
      ? () => onClick(itemProps.fxnParams)
      : false

    return (
      <ListGroupItem className={itemProps.className}
        onClick={handleOnClick}>
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
  itemProps: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
}
export default DefaultListGroupItem

