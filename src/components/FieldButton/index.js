import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DefaultListGroupItem from '../DefaultListGroupItem'
// import titleize from 'titleize'
import './@FieldButton.css'
import {setClassNamesListItem} from '../../helpers'
import { Popover } from 'react-bootstrap'

class FieldButton extends Component {

  setItemProps (item,  hoverSide) {
    // const checked = (<span className='glyphicon glyphicon-removed type-checked' aria-hidden='true' />)
    const checked = (<span className='glyphicon glyphicon-remove type-x' aria-hidden='true' />)
    let itemProps = {...item}
    let optionalClassNames = []
    if (itemProps.isSelected) {
      optionalClassNames.push('selected-field')
    }
    itemProps.className = setClassNamesListItem(itemProps, 'type', optionalClassNames)
    itemProps.otherComponents = itemProps.isSelected ? checked : null
    itemProps.hoverSide = hoverSide
    return itemProps
  }

  render () {
    let {itemProps, onClick, hoverSide, key} = this.props
    itemProps = this.setItemProps(itemProps, hoverSide)
    const FieldDefinition = <Popover id={'option-' + itemProps.value} title='Definition'>{itemProps.description || 'No definition available.'}</Popover>
    return (
      <Choose>
        <When condition={itemProps.isSelected}>
          <DefaultListGroupItem
            key={key}
            itemProps={itemProps}
            buttonOverlay={FieldDefinition}
            onClick={onClick.bind(this, null)} />
        </When>
        <Otherwise>
          <DefaultListGroupItem
            key={key}
            onClick={onClick.bind(this, itemProps.value)}
            itemProps={itemProps}
            buttonOverlay={FieldDefinition}   />
        </Otherwise>
      </Choose>
    )
  }
}

FieldButton.propTypes = {
  itemProps: PropTypes.object.isRequired
}
export default FieldButton
