require('c3/c3.css')

import React, { Component } from 'react'
import Chart from './C3Chart'
import { Button, ButtonGroup } from 'react-bootstrap'
import { capitalize } from 'underscore.string'
import pluralize from 'pluralize'
import _ from 'lodash'
import d3 from 'd3'

const colors = ['#a78ac6', '#04ae14', '#fb680e', '#fe32fe', '#a49659', '#ff5a8b', '#29a5ae', '#0eab6f', '#b479fc', '#de7b5c', '#89a004', '#3599fc', '#c68a13', '#f459c7', '#a99090', '#d47aa0', '#379fd4', '#76a080', '#77a250', '#fd634e', '#c579d6', '#8d8af4', '#df5ef5', '#8199ae', '#e37a31', '#40aa46', '#ea6f7b', '#c8884b', '#c18972', '#0fa98f', '#a4982b', '#fe43de', '#e06eb8', '#65a718', '#7994dd', '#b688a7', '#fd56a9', '#9b9779', '#ff5f6d', '#c88389', '#7d9c97', '#dd67de', '#5fa570', '#9292be', '#b79037', '#929c48', '#899d69', '#c57fb7', '#a985dd', '#e96c99', '#58a0b6', '#df7d02', '#f46d33', '#5ca297', '#9f91a7', '#ee6e65', '#d47f73', '#7da234', '#ec724d', '#54a857', '#2b9cec', '#b98e5a', '#d1842f', '#b4930e', '#af7fed', '#7298cd', '#db788a', '#18ac57', '#f447f6', '#cc855b', '#c773ed', '#4ea587', '#da7e4c', '#ff50b8', '#6a93f4', '#e06ac7', '#28a2c5', '#69a53d', '#ac9172', '#c98199', '#a78cb6']
// defaults

class ChartCanvas extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !_.isEqual(this.props.data, nextProps.data)
  }

  renderTitle (rowLabel, fieldName, groupName = null) {
    function toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    let title = toTitleCase(pluralize(rowLabel) + ' by ' + fieldName)
    return (<h2>{capitalize(title, true)}</h2>)
  }

  renderDateToggle () {
    let {dateBy, changeDateBy} = this.props
    let monthActive = dateBy === 'month' ? 'active' : ''
    let yearActive = dateBy === 'year' ? 'active' : ''
    return (
      <ButtonGroup className='toggle-time'>
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

  render () {
    let chartType = this.props.chartType || 'bar'
    let { rowLabel, selectedColumnDef, data, columns, sumBy } = this.props
    let type = selectedColumnDef.type
    let fieldName = selectedColumnDef.name
    let labels = Array.isArray(data[0]) ? data[0] : data[0].values
    let toggle = <span/>

    // chart defaults
    let options = {
      padding: {
        top: 20,
        bottom: 20,
        left: 50,
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

    if (((data[0].values && data[0].values.length > 10) || (Array.isArray(data[0]) && data[0].length > 11)) && chartType === 'bar') {
      options.rotated = true
      options.padding.left = (maxLabelLength * 4) + 55
    }

    if (type === 'number' && !selectedColumnDef.categories) {
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

    switch (selectedColumnDef.format) {
      case 'number':
        if (!selectedColumnDef.categories) {
          options.tickFormat.x = d3.format(',.2f')
        }
    }

    return (
      <div id='C3Chart'className={'container-fluid'}>
        {toggle}
        {this.renderTitle(rowLabel, fieldName)}
        <Chart
          data={data}
          type={chartType}
          dataType={type}
          options={options}
          colors={colors} />
      </div>
    )
  }
}

export default ChartCanvas
