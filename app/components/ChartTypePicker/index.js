import React from 'react'
import { Panel } from 'react-bootstrap'

const ChartTypePicker = ({chartTypes, chartType, onChange}) => {
  let options = chartTypes.map((type, idx) => {
    console.log(chartType === type.key)
        console.log(type.key)
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
  chartTypes: React.PropTypes.array,
  onChange: React.PropTypes.func
}

export default ChartTypePicker
