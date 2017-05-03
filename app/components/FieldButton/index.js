import React, { Component } from 'react'
import DefaultListGroupItem from '../DefaultListGroupItem'
// import titleize from 'titleize'
import './_fieldButton.scss'
import {setClassNamesListItem} from '../../helpers'
import { Popover } from 'react-bootstrap'
import Icon from '../Icon'

class FieldButton extends Component {

  setItemProps (item) {
    //const checked = (<span className='glyphicon glyphicon-removed type-checked' aria-hidden='true' />)
    const checked = (<span className='glyphicon glyphicon-remove type-x' aria-hidden='true'></span>)
    let itemProps = {...item}
    let optionalClassNames = []
    if (itemProps.isSelected) {
      optionalClassNames.push('selected-field')
    }
    itemProps.className = setClassNamesListItem(itemProps, 'type', optionalClassNames)
    itemProps.otherComponents = itemProps.isSelected ? checked : null
    return itemProps
  }

  render () {
    let {itemProps, onClick} = this.props
    itemProps = this.setItemProps(itemProps)
    const FieldDefinition = <Popover id={'option-' + itemProps.value} title='Definition'>{itemProps.description || 'No definition available.'}</Popover>
    return (
        <Choose>
          <When condition={itemProps.isSelected}>
            <DefaultListGroupItem
              itemProps={itemProps}
              buttonOverlay={FieldDefinition}
              onClick={onClick.bind(this, '')} />
          </When>
        <Otherwise>
        <DefaultListGroupItem
          onClick={onClick.bind(this, itemProps.value)}
          itemProps={itemProps}
          buttonOverlay={FieldDefinition} />
        </Otherwise>
       </Choose>
    )
  }
}

FieldButton.propTypes = {
  itemProps: React.PropTypes.object.isRequired
}
export default FieldButton
