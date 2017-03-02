
require('react-select/dist/react-select.css')
import React, { Component } from 'react'
import './_Query.scss'
import { Button, ButtonGroup } from 'react-bootstrap'
import {isColTypeTest} from '../../helpers'

class OtherDataToggle extends Component {

  isBarChart (chartType, selectedColumnDef, chartData) {
    let isDateCol = isColTypeTest(selectedColumnDef, 'date')

    let chL = function (chartData) {
      let chL = chartData.length
      if (chL > 13) {
        return true
      }
      return false
    }
    if (chartData) {
      if (selectedColumnDef && chartType === 'bar' && !isDateCol && chL(chartData)) {
        return true
      }
    }
    return false
  }

  render () {
    let {rollupBy, chartType, selectedColumnDef, changeRollupBy, chartData} = this.props
    let isRenderToggle = this.isBarChart(chartType, selectedColumnDef, chartData)
    if (!(rollupBy)) {
      rollupBy = 'other'
    }
    let allActive = rollupBy === 'none' ? 'active' : ''
    let otherActive = rollupBy === 'other' ? 'active' : ''
    return (
      <div>
        <Choose>
          <When condition={isRenderToggle}>
            <ButtonGroup className='ChartCanvasToggleOther'>
              <Button
                bsStyle='success'
                bsSize='small'
                onClick={() => { changeRollupBy('none') }}
                className={allActive}>
                Show All
              </Button>
              <Button
                bsStyle='success'
                bsSize='small'
                onClick={() => { changeRollupBy('other') }}
                className={otherActive}>
                Rollup Other
              </Button>
            </ButtonGroup>
          </When>
        </Choose>
      </div>
    )
  }
}

export default OtherDataToggle
