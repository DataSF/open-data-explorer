import React, { Component, PropTypes } from 'react'
import { Panel, ListGroupItem, ListGroup } from 'react-bootstrap'

class ColumnSelector extends Component {
  render () {
    const colorIndex = {
      'text': '#93c2de',
      'date': '#93deaf',
      'calendar_date': '#93deaf',
      'checkbox': '#deaf93',
      'number': '#de93c2',
      'double': '#de93c2',
      'money': '#de93c2',
      'other': '#E6FF2E'
    }

    let { columns, selected, onSelectColumn } = this.props

    console.log(columns)
    const options = columns.map((option) => {
      let classNames = ['ColumnSelector-list-group-item']
      let type = (option.isCategory ? 'category' : option.type)
      classNames.push('column-type-' + type)
      if (option.value === selected && selected) {
        classNames.push('selected')
      } else if (selected) {
        classNames.push('not-selected')
      }
      return (
        <ListGroupItem
          key={option.value}
          onClick={onSelectColumn.bind(this, option.value)}
          style={{backgroundColor: colorIndex[option.type]}}
          className={classNames}>
          {option.label}
        </ListGroupItem>)
    })
    return (
      <Panel collapsible defaultExpanded header='Select a dataset column'>
        Help text
        <ListGroup fill className='ColumnSelector-list-group'>
          {options}
        </ListGroup>
      </Panel>
    )
  }
}

ColumnSelector.propTypes = {
  columns: PropTypes.array,
  selected: PropTypes.string,
  onSelectColumn: PropTypes.func
}

export default ColumnSelector
