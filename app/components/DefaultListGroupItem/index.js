import React, { Component } from 'react'
import {ListGroupItem} from 'react-bootstrap'
import './_defaultListGroupItem.scss'

class DefaultListGroupItem extends Component {
  render () {
    console.log(this.props)
    let {itemProps, onClick} = this.props
    if(onClick){
      onClick = onClick.bind(this, itemProps.onClickParams)
    }
    return (
      <ListGroupItem className={itemProps.className}
        onClick={onClick}>
        {this.props.children}
      </ListGroupItem>
    )
  }
}
DefaultListGroupItem.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default DefaultListGroupItem

