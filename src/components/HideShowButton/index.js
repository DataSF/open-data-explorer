import './@HideShowButton.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DefaultListGroupItem from '../DefaultListGroupItem'

class HideShowButton extends Component {
  constructor(props) {
    super(props)

    this.setItemProps = this.setItemProps.bind(this)
  }

  setItemProps (itemProps) {
    let updatedProps = {...itemProps}
    const hideAll = (<span className='hide-show-icon glyphicon glyphicon-menu-up' aria-hidden='true' />)
    const showAll = (<span className='hide-show-icon glyphicon glyphicon-menu-down' aria-hidden='true' />)
    const showAllText = 'Show All '
    const hideAllText = 'Hide All '
    updatedProps.otherComponents = updatedProps.isSelected ? hideAll : showAll
    updatedProps.label = updatedProps.isSelected ? hideAllText : showAllText + ' (' + updatedProps.value + ')'
    updatedProps.actfxnParams = updatedProps.isSelected ? hideAllText : showAllText
    updatedProps.className = 'show-hide-button'
    updatedProps.actionFxnParams = updatedProps.label
    return updatedProps
  }

  render () {
    let {itemProps, onClick, showCols} = this.props
    let updatedProps = this.setItemProps(itemProps)
    return (
      <DefaultListGroupItem itemProps={updatedProps} onClick={onClick.bind(this, !showCols)} />
    )
  }
}

HideShowButton.propTypes = {
  itemProps: PropTypes.object.isRequired
}
export default HideShowButton
