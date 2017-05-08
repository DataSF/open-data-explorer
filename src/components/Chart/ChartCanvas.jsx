require('c3/c3.css')

import React, { Component } from 'react'
import Chart from './C3Chart'
import { toTitleCase } from '../../helpers'
import pluralize from 'pluralize'
import _ from 'lodash'
import d3 from 'd3'
import { Button, Col, ButtonGroup } from 'react-bootstrap'
import './_Chart.scss'

const colors = ['#a78ac6', '#04ae14', '#fb680e', '#fe32fe', '#a49659', '#ff5a8b', '#29a5ae', '#0eab6f', '#b479fc', '#de7b5c', '#89a004', '#3599fc', '#c68a13', '#f459c7', '#a99090', '#d47aa0', '#379fd4', '#76a080', '#77a250', '#fd634e', '#c579d6', '#8d8af4', '#df5ef5', '#8199ae', '#e37a31', '#40aa46', '#ea6f7b', '#c8884b', '#c18972', '#0fa98f', '#a4982b', '#fe43de', '#e06eb8', '#65a718', '#7994dd', '#b688a7', '#fd56a9', '#9b9779', '#ff5f6d', '#c88389', '#7d9c97', '#dd67de', '#5fa570', '#9292be', '#b79037', '#929c48', '#899d69', '#c57fb7', '#a985dd', '#e96c99', '#58a0b6', '#df7d02', '#f46d33', '#5ca297', '#9f91a7', '#ee6e65', '#d47f73', '#7da234', '#ec724d', '#54a857', '#2b9cec', '#b98e5a', '#d1842f', '#b4930e', '#af7fed', '#7298cd', '#db788a', '#18ac57', '#f447f6', '#cc855b', '#c773ed', '#4ea587', '#da7e4c', '#ff50b8', '#6a93f4', '#e06ac7', '#28a2c5', '#69a53d', '#ac9172', '#c98199', '#a78cb6']
// defaults

class ChartCanvas extends Component {
  constructor (props) {
    super(props)

    this.renderTitle = this.renderTitle.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    let thisChart = {
      chartData: this.props.chartData,
      chartType: this.props.chartType
    }
    let nextChart = {
      chartData: nextProps.chartData,
      chartType: nextProps.chartType
    }
    return !_.isEqual(thisChart, nextChart)
  }

  renderTitle () {
    let {columns, sumBy, rowLabel, groupBy, selectedColumnDef} = this.props
    let a = pluralize(rowLabel)
    let b = selectedColumnDef.name

    if (sumBy) {
      a = 'Sum of ' + columns[sumBy].name
    }

    let title = a + ' by ' + b

    if (groupBy) {
      title += ' and ' + columns[groupBy].name
    }
    return (<h2 className={'chartTitle'}>{toTitleCase(title)}</h2>)
  }

  renderSubTitle () {
    let {filters, columns} = this.props
    let subtitle = ''
    if (!_.isEmpty(filters)) {
      subtitle = 'Only Showing '
      for (var key in filters) {
        if (filters[key].options && filters[key].options.selected) {
          subtitle += columns[key].name + ': '
          if (typeof filters[key].options.selected === 'string') {
            subtitle += filters[key].options.selected
          } else {
            subtitle += filters[key].options.selected.join(', ')
          }
        }
      }
    }
    return subtitle === '' ? false : (<h3 className={'chartTitle'}>{subtitle}</h3>)
  }

  renderDateToggle () {
    let {dateBy, changeDateBy} = this.props
    let monthActive = dateBy === 'month' ? 'active' : ''
    let yearActive = dateBy === 'year' ? 'active' : ''
    return (
      <ButtonGroup className='ChartCanvasToggleTime'>
        <Button
          bsStyle='success'
          bsSize='small'
          onClick={() => { changeDateBy('month') }}
          className={monthActive}>
          Month
        </Button>
        <Button
          bsStyle='success'
          bsSize='small'
          onClick={() => { changeDateBy('year') }}
          className={yearActive}>
          Year
        </Button>
      </ButtonGroup>)
  }

  renderChartOptions (selectedColumnDef, rowLabel) {
    let options = {
      padding: {
        top: 20,
        bottom: 20,
        left: 60,
        right: 10
      },
      grid: {
        x: false,
        y: true
      },
      axisLabel: {
        x: selectedColumnDef.name,
        y: 'Number of ' + pluralize(rowLabel)
      },
      tickFormat: {
        x: null,
        y: d3.format(',')
      },
      timeseries: false,
      rotated: false,
      stacked: false,
      onClick: function (d) {
        let categories = this.categories() // c3 function, get categorical labels
        console.log(d)
        console.log(categories)
        console.log('you clicked {' + d.name + ': ' + categories[d.x] + ': ' + d.value + '}')
      }
    }
    return options
  }

  renderMaxLabelLength (labels, data) {
    let maxLabelLength = labels.reduce((prev, curr, idx, array) => {
      if (Array.isArray(data[0])) {
        return curr.length > prev ? curr.length : prev
      } else {
        if (!curr.label) {
          curr.label = 'Unknown'
        }
        return curr.label.length > prev ? curr.label.length : prev
      // return curr.value.length > prev.value.length ? curr.value.length : prev.value.length
      }
    }, 0)
    return maxLabelLength
  }

  renderChartCanvasComponent (chartType, rowLabel, selectedColumnDef, chartData, columns, sumBy, displayChartOptions) {
    let type = selectedColumnDef.type
    let labels = Array.isArray(chartData[0]) ? chartData[0] : chartData[0].values
    let toggle = <span />
     // chart defaults
    let options = this.renderChartOptions(selectedColumnDef, rowLabel)
    let maxLabelLength = this.renderMaxLabelLength(labels, chartData)
    if (((chartData[0].values && chartData[0].values.length > 10) || (Array.isArray(chartData[0]) && chartData[0].length > 11)) && chartType === 'bar' && type !== 'date') {
      options.rotated = true
      options.padding.left = (maxLabelLength * 4) + 55
    }

    if ((type === 'number' && !selectedColumnDef.categories) || type === 'date') {
      options.rotated = false
    }

    if (type === 'date') {
      options.timeseries = true
      toggle = this.renderDateToggle()
    } else if (type === 'checkbox') {
      options.stacked = true
    }

    if (sumBy) {
      options.axisLabel.y = columns[sumBy].name
      switch (columns[sumBy].format) {
        case 'money':
          options.tickFormat.y = d3.format('$,.2f')
      }
    }
    return (
      <Col md={9}>
        <div id='C3Chart'className='c3ChartContainer'>
          {toggle}
          {this.renderTitle()}
          {this.renderSubTitle()}
          <Chart
            chartData={chartData}
            type={chartType}
            dataType={type}
            options={options}
            displayChartOptions={displayChartOptions}
            colors={colors} />
        </div>
      </Col>
    )
  }

  render () {
    let chartType = this.props.chartType
    let { rowLabel, selectedColumnDef, chartData, columns, sumBy, displayChartOptions } = this.props
    let chartCanvas = null
    const jumbotronInstance = (
      <Col md={9}>
        <div className='chartCanvasBlankCanvas'>
          Click on a dataset column to the right to start your charting adventure :-)
        </div>
      </Col>
      )

    if (selectedColumnDef && chartData) {
      chartCanvas = this.renderChartCanvasComponent(chartType, rowLabel, selectedColumnDef, chartData, columns, sumBy, displayChartOptions)
    } else {
      chartCanvas = jumbotronInstance
    }

    return (
      <div>
        {chartCanvas}
      </div>
    )
  }
}

export default ChartCanvas
