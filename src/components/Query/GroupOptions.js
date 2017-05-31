import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Panel } from 'react-bootstrap'

class GroupOptions extends Component {
  render () {
    let { columns, selected, onGroupBy } = this.props
    return (
      columns.length !== 0
      ? <Panel collapsible defaultExpanded header='Group by another field' bsStyle={'primary'}>
        <Select
          name='groupby'
          placeholder='Select a field to group by'
          options={columns}
          value={selected}
          onChange={onGroupBy} />
      </Panel>
      : false
    )
  }
}

GroupOptions.propTypes = {
  columns: PropTypes.array,
  selected: PropTypes.string,
  onGroupBy: PropTypes.func
}

export default GroupOptions
