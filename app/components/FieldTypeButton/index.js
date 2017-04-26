import React, { Component } from 'react'
import DefaultListGroupItem from '../DefaultListGroupItem'
import titleize from 'titleize'
import {setClassNamesListItem} from '../../helpers'
class FieldTypeButton extends Component {

  setItemProps (itemProps) {
    const classNameObj = {'base': 'field-type-button', 'isSelected': 'field-type-button-is-selected', 'notSelected': 'field-type-button-not-selected'}
    const checked = (<span className='type-checked-icon glyphicon glyphicon-ok' aria-hidden='true' />)
    itemProps.className = setClassNamesListItem(itemProps, 'label', classNameObj)
    itemProps.otherComponents = itemProps.isSelected ? checked : null
    let cnt = ' (' + itemProps.value + ')'
    itemProps.label = itemProps.label === 'boolean' ? 'True/False' + cnt : titleize(itemProps.label) + cnt
    itemProps.fxnParams = itemProps.label
    return itemProps
  }

  render () {
    let {itemProps} = this.props
    if(!(itemProps.isSelected)){
      itemProps.isSelected = false
    }
    itemProps = this.setItemProps(itemProps)
    return (
      <DefaultListGroupItem itemProps={itemProps} />
    )
  }
}

FieldTypeButton.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default FieldTypeButton
