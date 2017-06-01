import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem, OverlayTrigger } from 'react-bootstrap'
import './@DefaultListGroupItem.css'

class DefaultListGroupItem extends Component {
  render () {
    let {itemProps, onClick, buttonOverlay} = this.props
    let handleOnClick = typeof onClick === 'function'
      ? () => onClick(itemProps.fxnParams)
      : false

    return (
      <Choose>
        <When condition={buttonOverlay}>
          <OverlayTrigger key={itemProps.value} trigger={['hover', 'focus']} placement='left' overlay={buttonOverlay}>
            <ListGroupItem className={itemProps.className}
              onClick={handleOnClick}>
              {itemProps.label}
              <Choose>
                <When condition={itemProps.hasOwnProperty('otherComponents')}>
                  {itemProps.otherComponents}
                </When>
              </Choose>
            </ListGroupItem>
          </OverlayTrigger>
        </When>
        <Otherwise>
          <ListGroupItem className={itemProps.className}
            onClick={handleOnClick}>
            {itemProps.label}
            <Choose>
              <When condition={itemProps.hasOwnProperty('otherComponents')}>
                {itemProps.otherComponents}
              </When>
            </Choose>
          </ListGroupItem>
        </Otherwise>
      </Choose>
    )
  }
}
DefaultListGroupItem.propTypes = {
  itemProps: PropTypes.object.isRequired,
  onClick: PropTypes.func
}
export default DefaultListGroupItem

