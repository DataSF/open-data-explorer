import React, { Component } from 'react'
import DefaultListGroupItem from '../DefaultListGroupItem'
import './@FieldTypeButton.css'
import { setClassNamesListItem } from '../../helpers'

class FieldTypeButton extends Component {

  setItemProps (item) {
    const checked = (<span className='glyphicon glyphicon-ok type-checked' aria-hidden='true' />)
    let itemProps = {...item}
    itemProps.className = setClassNamesListItem(itemProps, 'value')
    itemProps.otherComponents = itemProps.isSelected ? checked : null
    itemProps.label += ' (' + itemProps.count + ')'
    itemProps.fxnParams = itemProps.value
    return itemProps
  }

  render () {
    let {itemProps, onClick} = this.props
    itemProps = this.setItemProps(itemProps)
    return (
      <DefaultListGroupItem
        itemProps={itemProps}
        onClick={onClick} />
    )
  }
}

FieldTypeButton.propTypes = {
  itemProps: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
}
export default FieldTypeButton
