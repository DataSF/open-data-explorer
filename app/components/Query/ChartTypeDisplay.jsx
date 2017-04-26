import React, { Component } from 'react'
import RadioGroup from 'react-radio-group'
import './_chartTypeDisplay.scss'
import { Panel } from 'react-bootstrap'
import {isColTypeTest} from '../../helpers'

class ChartTypeDisplay extends Component {

  render () {
    let {applyChartType, chartType, selectedColumnDef} = this.props
    let isDateCol = isColTypeTest(selectedColumnDef, 'date')
    let isNumericCol = isColTypeTest(selectedColumnDef, 'number')
    if (!(chartType)) {
      if (isDateCol) {
        chartType = 'line'
      } else if (isNumericCol) {
        chartType = 'histogram'
      } else {
        chartType = 'bar'
      }
    }
    return (
      <Panel collapsible defaultExpanded header={'Choose chart type'} bsStyle={'primary'}>
        <Choose>
          <When condition={isDateCol}>
            <div className={'chartTypeRadio'}>
              <RadioGroup name='chartTypes' selectedValue={chartType} onChange={applyChartType}>
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
          </When>
          <When condition={isNumericCol}>
            <div className={'chartTypeRadio'}>
              <RadioGroup name='chartTypes' selectedValue={chartType} onChange={applyChartType}>
                {Radio => (
                  <div>
                    <label className={'chartTypeRadioLabel'}>
                      <Radio value='histogram' />Histogram
                    </label>
                  </div>
                )}
              </RadioGroup>
            </div>
          </When>
          <Otherwise>
            <div className={'chartTypeRadio'}>
              <RadioGroup name='chartTypes' selectedValue={chartType} onChange={applyChartType}>
                {Radio => (
                  <div>
                    <label className={'chartTypeRadioLabel'}>
                      <Radio value='bar' />Bar
                    </label>
                  </div>
                )}
              </RadioGroup>
            </div>
          </Otherwise>
        </Choose>
      </Panel>
    )
  }
}

ChartTypeDisplay.propTypes = {
  chartType: React.PropTypes.string,
  displayChartOptions: React.PropTypes.bool,
  selectedColumnDef: React.PropTypes.object
}

export default ChartTypeDisplay
