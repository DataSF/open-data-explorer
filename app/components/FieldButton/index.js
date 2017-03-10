import React, { Component } from 'react'
import DefaultListGroupItem from '../DefaultListGroupItem'
import titleize from 'titleize'
// import './_fieldButton.scss'
import {setClassNamesListItem} from '../../helpers'


class FieldButton extends Component {

  setItemProps (itemProps) {
    itemProps.className = setClassNamesListItem(itemProps, 'type')
    itemProps.actionFxnParams = itemProps.label
    return itemProps
  }

  render () {
    let {itemProps} = this.props
    itemProps = this.setItemProps(itemProps)
    return (
      <DefaultListGroupItem
        itemProps={itemProps}>
      </DefaultListGroupItem>
    )
  }
}

FieldButton.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default FieldButton
