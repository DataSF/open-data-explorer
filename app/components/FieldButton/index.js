import React, { Component } from 'react'
import DefaultListGroupItem from '../DefaultListGroupItem'
import {setClassNamesListItem} from '../../helpers'
import Icon from '../Icon'

class FieldButton extends Component {
  setItemProps (itemProps) {
    const classNameObj = {'base': 'field-button', 'isSelected': 'field-button-is-selected', 'notSelected': 'field-button-not-selected'}
    return {...itemProps, className: setClassNamesListItem(itemProps, 'type', classNameObj), 'onClickParams': itemProps.label}
  }
  render () {
    let {itemProps, onClick, iconClick} = this.props
    if (!(itemProps.isSelected)) {
      itemProps.isSelected = false
    }
    itemProps = this.setItemProps(itemProps)
    return (
      <Choose>
        <When condition={itemProps.isSelected}>
          <DefaultListGroupItem itemProps={itemProps}>
            <span className={'field-button-selected-text'}>
              {itemProps.label}
            </span>
            <Icon label={'glyphicon glyphicon-remove'} className={'remove-field-icon'} onClick={iconClick} onClickParams={'x'} />
          </DefaultListGroupItem>
        </When>
        <Otherwise>
          <DefaultListGroupItem itemProps={itemProps} onClick={onClick}>
            {itemProps.label}
          </DefaultListGroupItem>
        </Otherwise>
      </Choose>
    )
  }
}

FieldButton.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default FieldButton
