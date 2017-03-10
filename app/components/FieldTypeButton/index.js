import React, { Component } from 'react'
import DefaultListGroupItem from '../DefaultListGroupItem'
import titleize from 'titleize'
import './_fieldTypeButton.scss'
import {setClassNamesListItem} from '../../helpers'
class FieldTypeButton extends Component {

  setItemProps (itemProps) {
    const checked = (<span className='glyphicon glyphicon-ok type-checked' aria-hidden='true'></span>)
    itemProps.className = setClassNamesListItem(itemProps, 'label')
    itemProps.otherComponents = itemProps.isSelected ? checked : null
    let cnt = ' (' + itemProps.count + ')'
    itemProps.label = itemProps.label === 'boolean' ? 'True/False' + cnt : titleize(itemProps.label) + cnt
    itemProps.fxnParams = itemProps.label
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

FieldTypeButton.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default FieldTypeButton
