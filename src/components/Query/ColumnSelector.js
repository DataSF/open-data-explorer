import React, { Component, PropTypes } from 'react'
import { ListGroupItem, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap'

class ColumnSelector extends Component {
  render () {
    let { columns, selected, onSelectColumn } = this.props
    const options = columns.map((option) => {
      let classNames = ['ColumnSelector-list-group-item', 'column-type']
      // let type = (option.isCategory ? 'category' : option.type)
      classNames.push('column-type--' + option.type)
      if (option.value === selected && selected) {
        classNames.push('selected')
      } else if (selected) {
        classNames.push('not-selected')
      }

      const FieldDefinition = <Popover id={'option-' + option.value} title='Definition'>{option.description || 'No definition available.'}</Popover>
      return (
        <OverlayTrigger key={option.value} trigger={['hover', 'focus']} placement='left' overlay={FieldDefinition}>
          <ListGroupItem
            onClick={onSelectColumn.bind(this, option.value)}
            className={classNames}>
            {option.label}
          </ListGroupItem>
        </OverlayTrigger>)
    })
    return (
      <ListGroup fill className='ColumnSelector-list-group'>
        {options}
      </ListGroup>
    )
  }
}

ColumnSelector.propTypes = {
  columns: PropTypes.array,
  selected: PropTypes.string,
  onSelectColumn: PropTypes.func
}

export default ColumnSelector
