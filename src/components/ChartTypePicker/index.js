import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import {CirclePicker } from 'react-color';
import './@ChartTypePicker.css'


const ChartTypePicker = ({chartTypes, chartType, onChange, onChangeChartColor, isGroupBy}) => {
  let options = chartTypes.map((type, idx) => {
    return (
      <label className='radio-inline' key={type.key}>
        <input type='radio' name='chartTypeOptions' id={'chartType' + idx} value={type.key} onChange={() => onChange(type.key)} checked={chartType === type.key} />
        {type.name}
      </label>
    )
  })

  return (
    <Panel collapsible defaultExpanded bsStyle='primary' header={<h4>Choose a chart type <span className='glyphicon collapse-icon' aria-hidden></span></h4>}>
      <div className={'chart-picker'}>
        {options}
      </div>
      <Choose>
        <When condition={!isGroupBy}>
            <div className={'color-picker'}>
              <CirclePicker
                onChange={onChangeChartColor} />
            </div>
        </When>
      </Choose>
    </Panel>
  )
}

ChartTypePicker.propTypes = {
  chartTypes: PropTypes.array,
  onChange: PropTypes.func
}

export default ChartTypePicker
