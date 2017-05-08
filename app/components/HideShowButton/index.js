import React, { Component } from 'react'
import DefaultListGroupItem from '../DefaultListGroupItem'
// import {setClassNamesShowHide} from '../../helpers'
class HideShowButton extends Component {

  setItemProps (itemProps) {
    const hideAll = (<span className='hide-show-icon glyphicon glyphicon-menu-up' aria-hidden='true' />)
    const showAll = (<span className='hide-show-icon glyphicon glyphicon-menu-down' aria-hidden='true' />)
    const showAllText = 'Show All '
    const hideAllText = 'Hide All '
    // const classNameObj = {'base': 'show-hide-button', 'isSelected': 'field-type-button-is-selected', 'notSelected': 'field-type-button-selected'}
    // itemProps.className = setClassNamesShowHide(itemProps, classNameObj)
    itemProps.otherComponents = itemProps.isSelected ? hideAll : showAll
    itemProps.label = itemProps.isSelected ? hideAllText : showAllText + ' (' + itemProps.value + ')'
    itemProps.actfxnParams = itemProps.isSelected ? hideAllText : showAllText
    itemProps.className = 'show-hide-button'
    itemProps.actionFxnParams = itemProps.label
    return itemProps
  }

  render () {
    let {itemProps, onClick, showCols} = this.props
    if (showCols === 'hide') {
      showCols = 'show'
      itemProps.isSelected = true
    } else if (showCols === 'show') {
      showCols = 'hide'
      itemProps.isSelected = false
    } else {
      showCols = 'show'
      itemProps.isSelected = false
    }
    itemProps = this.setItemProps(itemProps)
    return (
      <DefaultListGroupItem itemProps={itemProps} onClick={onClick.bind(this, showCols)} />
    )
  }
}

HideShowButton.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default HideShowButton
