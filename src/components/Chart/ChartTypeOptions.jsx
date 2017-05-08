import React, { Component, PropTypes } from 'react'
import RadioGroup from 'react-radio-group'
import './_Chart.scss'
import { Panel } from 'react-bootstrap'

class ChartTypeOptions extends Component {
  renderChartTypes () {
    let {applyChartType, chartType} = this.props

    return (
      <Panel collapsible defaultExpanded header='Configure chart display options'>
        <div className={'chartTypeRadio'}>
          <RadioGroup
            name='chartTypes'
            selectedValue={chartType}
            onChange={applyChartType}>
            {Radio => (
              <div>
                <label className={'chartTypeRadioLabel'}>
                  <Radio value='bar' />Bar
                </label>
                <label className={'chartTypeRadioLabel'}>
                  <Radio value='line' />Line
                </label>
                <label className={'chartTypeRadioLabel'}>
                  <Radio value='area' />Area
                </label>
              </div>
            )}
          </RadioGroup>
        </div>
      </Panel>
    )
  }

  render () {
    /*
    let {displayChartOptions} = this.props
    let chartTypeOptions = null
    if (displayChartOptions) {
      chartTypeOptions = this.renderChartTypes()
    }
    */
    let chartTypeOptions = this.renderChartTypes()
    return (
      <div>
        {chartTypeOptions}
      </div>
    )
  }
}

ChartTypeOptions.defaultProps = {
  chartType: 'bar'
}

ChartTypeOptions.propTypes = {
  applyChartType: PropTypes.func,
  chartType: PropTypes.string,
  displayChartOptions: PropTypes.object
}

export default ChartTypeOptions
