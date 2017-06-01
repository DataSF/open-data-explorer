import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

const ChartTypePicker = ({chartTypes, chartType, onChange}) => {
  let options = chartTypes.map((type, idx) => {
    return (
      <label className='radio-inline' key={type.key}>
        <input type='radio' name='chartTypeOptions' id={'chartType' + idx} value={type.key} onChange={() => onChange(type.key)} checked={chartType === type.key} />
        {type.name}
      </label>
    )
  })

  return (
    <Panel collapsible defaultExpanded bsStyle='primary' header='Choose chart type'>
      {options}
    </Panel>
  )
}

ChartTypePicker.propTypes = {
  chartTypes: PropTypes.array,
  onChange: PropTypes.func
}

export default ChartTypePicker
