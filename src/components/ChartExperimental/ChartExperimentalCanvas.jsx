/* global Choose, When, Otherwise */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import d3 from 'd3'
import BlankChart from './BlankChart'
import $ from 'jquery'
import ChartExperimentalBarStuff from './ChartExperimentalBarStuff'
import ChartExperimentalLineStuff from './ChartExperimentalLineStuff'
import ChartExperimentalAreaStuff from './ChartExperimentalAreaStuff'
import ChartExperimentalHistogramStuff from './ChartExperimentalHistogramStuff'
import { findMaxObjKeyValue, isColTypeTest, sumObj, sortObj, transformOthers } from '../../helpers'

class ChartExperimentalCanvas extends Component {

  componentWillMount () {
    var _self = this

    $(window).on('resize', function (e) {
      _self.updateSize()
    })

    this.setState({
      width: this.props.width,
      height: this.props.height
    })
  }
  componentDidMount () {
    this.updateSize()
  }
  componentWillUnmount () {
    $(window).off('resize')
  }

  updateSize () {
    var ReactDOM = require('react-dom')
    var node = ReactDOM.findDOMNode(this)
    var parentWidth = $(node).width()
    let { embed } = this.props

    if (!(parentWidth === this.props.width)) {
      this.setState({width: parentWidth - 20})
    } else {
      this.setState({width: this.props.width})
    }
    if (embed) {
      // this is a hack for now, we'll lift the state up to make handling layout simpler
      let offset = $('#Embed-chartHeader').outerHeight(true) + 21
      this.setState({height: window.innerHeight - offset})
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    /*
    This component needs to be refactored to handle resizing on a container, for now, we'll update the component always
    We should also not rerender the char
    */
    let thisChart = {
      chartData: this.props.chartData,
      chartType: this.props.chartType,
      height: this.state.height,
      width: this.state.width
    }
    let nextChart = {
      chartData: nextProps.chartData,
      chartType: nextProps.chartType,
      height: nextState.height,
      width: nextState.width
    }
    return !isEqual(thisChart, nextChart)
  }

  isSelectedColDate (selectedColumnDef) {
    if (selectedColumnDef.type === 'date') {
      return true
    }
    return false
  }

  formatChartDataDates (itemList, dateBy) {
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    itemList = itemList.map(function (item, index) {
      let dt = item['label'].split('T')
      dt = dt[0].split('-')
      if (dateBy === 'month') {
        item['key'] = monthFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      } else {
        item['key'] = yrFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      }
      item['value'] = Number(item['value'])
      return item
    })
    return itemList
  }

  formatChartDataDatesGrpBy (itemList, dateBy) {
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    itemList = itemList.map(function (item, index) {
      if (dateBy === 'month') {
        item['label'] = monthFormat(new Date(item['label']))
      } else {
        item['label'] = yrFormat(new Date(item['label']))
      }
      return item
    })
    return itemList
  }

  formatChartDataCol (itemList) {
    itemList = itemList.map(function (item, index) {
      item['key'] = String(item['label'])
      item['value'] = Number(item['value'])
      return item
    })
    return itemList
  }

  formatBlankChartData (itemList) {
    itemList = itemList.map(function (item, index) {
      if (item['key'] === 'undefined') {
        item['blank'] = Number(item['value'])
      }
      return item
    })
    delete itemList['undefined']
    return itemList
  }

  formatWhiteSpaceChartData (itemList) {
    itemList = itemList.map(function (item, index) {
      item['key'] = item['key'].replace(/(\r\n|\n|\r|\t)/gm, 'whitespace')
      item['key'] = item['key'].replace('  ', 'whitespace')
      if (item['key'] === ' ') {
        item['key'] = 'whitespace'
      }
      return item
    })
    return itemList
  }

  castChartData (chartData, isDtCol, dateBy) {
    let newChartData = []
    if (isDtCol) {
      newChartData = this.formatChartDataDates(chartData, dateBy)
    } else {
      newChartData = this.formatChartDataCol(chartData)
    }
    newChartData = this.formatBlankChartData(newChartData)
    newChartData = this.formatWhiteSpaceChartData(newChartData)
    return newChartData
  }

  formatChartDataGrpBy (itemList, dateBy, isDateCol) {
    let newdict = {}
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    Object.keys(itemList).forEach(function (key, index) {
      if (key === 'label') {
        newdict[key] = String(itemList[key])
        if (newdict[key] === 'undefined') {
          newdict[key] = 'blank'
        }
      } else if (key === 'undefined') {
        newdict['blank'] = Number(itemList[key])
      } else {
        newdict[key] = Number(itemList[key])
      }
    })

    if (isDateCol) {
      let dt = newdict['label'].split('T')
      dt = dt[0].split('-')
      if (dateBy === 'month') {
        newdict['label'] = monthFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      } else {
        newdict['label'] = yrFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      }
    }
    return newdict
  }

  castChartDataGrpBy (chartData, isDtCol, dateBy) {
    let newChartData = []
    for (let i = 0; i < chartData.length; i++) {
      let newdict = this.formatChartDataGrpBy(chartData[i], dateBy, isDtCol)
      newChartData.push(newdict)
    }
    return newChartData
  }
  sortChartDataGrpByDate (newChartData, dateBy) {
    console.log("new chart data")
    console.log(newChartData)
    if (dateBy === 'month') {
      newChartData.sort(function(a, b){
        let keyA = new Date(a.label),
        keyB = new Date(b.label);
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0
  })

    } else {
      newChartData.sort(function (a, b) {
        return Number(a.label) - Number(b.label)
      })
    }
    return newChartData
  }
  
  sortChartDataGrpBy (newChartData) {
    let sortedNewChartData = []
    let grpSumDict = {}
    Object.keys(newChartData).forEach(function (key, index) {
      grpSumDict[key] = sumObj(newChartData[key], 'label')
    })
    let sorted = sortObj(grpSumDict)
    for (let i = 0; i < sorted.length; i++) {
      let idx = sorted[i][0]
      sortedNewChartData.push(newChartData[idx])
    }
    return sortedNewChartData
  }

  convertChartData (chartData, selectedColumnDef, dateBy, isGroupBy) {
    //let newChartData = []
    let isDtCol = isColTypeTest(selectedColumnDef, 'date')
    if (chartData && chartData.length > 1) {
      if (!isGroupBy) {
        return this.castChartData(chartData, isDtCol, dateBy)
      } 
    }
    return chartData
  }

  getMaxDate (dateBy, chartType, chartData) {
    let maxDt = ''
    if (chartType === 'line') {
      maxDt = Math.max.apply(Math, chartData.map(function (o) { return o.key }))
    }
    return maxDt
  }

  isGroupByz (groupByKeys, barChartType) {
    if (groupByKeys) {
      if (groupByKeys.length > 1) {
        return true
      }
    }
    return false
  }

  setDefaultChartType (selectedColumnDef, chartType) {
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
    return chartType
  }

  render () {
    let {rowLabel, selectedColumnDef, groupKeys, chartData, chartType, rollupBy} = this.props
    chartType = this.setDefaultChartType(selectedColumnDef, chartType)
    let fillColor
    let grpColorScale
    const fillColorIndex = {
      'text': '#93c2de',
      'date': '#93deaf',
      'calendar_date': '#93deaf',
      'boolean': '#deaf93',
      'number': '#de93c2',
      'double': '#de93c2',
      'money': '#de93c2',
      'other': '#E6FF2E'
    }
    const groupByColorIndex = {
      'text': {'start': '#31c4ed', 'end': '#0000ff'},
      'date': {'start': '#204c39', 'end': '#83F52C'},
      'calendar_date': {'start': '#204c39', 'end': '#83F52C'},
      'boolean': {'start': '#cc8458', 'end': '#F0DACE'},
      'number': {'start': '#c71585', 'end': '#ffc0cb'},
      'double': {'start': '#c71585', 'end': '#ffc0cb'},
      'money': {'start': '#c71585', 'end': '#ffc0cb'}
    }
    let isDateSelectedCol = false
    let colName = ''
    let numericCol = isColTypeTest(selectedColumnDef, 'number')
    let isGroupBy = this.isGroupByz(groupKeys)
    //chartData = this.convertChartData(chartData, selectedColumnDef, dateBy, isGroupBy)
    if (selectedColumnDef) {
      fillColor = fillColorIndex[selectedColumnDef.type]
      grpColorScale = groupByColorIndex[selectedColumnDef.type]
      isDateSelectedCol = this.isSelectedColDate(selectedColumnDef)
      colName = selectedColumnDef.name
    }
    let xAxisPadding = { left: 50, right: 50 }
    let xTickCnt = 5
    let yTickCnt = 6
    let margin = {top: 1, right: 5, bottom: 1, left: 5}
    let w = this.state.width - (margin.left + margin.right)
    let h = this.state.height - (margin.top + margin.bottom)
    let formatValue = d3.format('.3s')
    let xAxisHeight = 100
    // let formatValue = d3.format('d')
    let legendStyle = {
      color: '#666',
      paddingRight: 40,
      paddingLeft: 60
    }
    let valTickFormater
    let maxValue = findMaxObjKeyValue(chartData, 'value')
    if (maxValue > 10) {
      valTickFormater = function (d) { return formatValue(d) }
    }
    let domainMax = maxValue + (maxValue * 0.05)
    let minTickGap = 200
    if (!rollupBy) {
      rollupBy = 'other'
    }
    let isDtCol = isColTypeTest(selectedColumnDef, 'date')
    if (rollupBy === 'other' && !isDtCol && chartData) {
      let chartDataTop15 = transformOthers(chartData, maxValue, isGroupBy)
      if (chartDataTop15) {
        chartData = chartDataTop15['chartData']
      }
    }

    let yAxisWidth = 70
    return (
      <div className='chartCanvas'>
        <Choose>
          <When condition={selectedColumnDef}>
            <Choose>
              <When condition={numericCol}>
                <Choose>
                  <When condition={chartType === 'histogram'}>
                    <ChartExperimentalHistogramStuff
                      w={w}
                      h={h}
                      yAxisWidth={yAxisWidth}
                      xAxisHeight={xAxisHeight}
                      domainMax={domainMax}
                      isGroupBy={isGroupBy}
                      margin={margin}
                      rowLabel={rowLabel}
                      fillColor={fillColor}
                      colName={colName}
                      groupKeys={groupKeys}
                      chartData={chartData}
                      yTickCnt={yTickCnt}
                      xTickCnt={xTickCnt}
                      xAxisPadding={xAxisPadding}
                      valTickFormater={valTickFormater} />
                  </When>
                </Choose>
              </When>
              <When condition={chartType === 'bar'}>
                <ChartExperimentalBarStuff
                  w={w}
                  h={h}
                  yAxisWidth={yAxisWidth}
                  minTickGap={minTickGap}
                  domainMax={domainMax}
                  isGroupBy={isGroupBy}
                  margin={margin}
                  rowLabel={rowLabel}
                  fillColor={fillColor}
                  groupKeys={groupKeys}
                  chartData={chartData}
                  yTickCnt={yTickCnt}
                  xTickCnt={xTickCnt}
                  valTickFormater={valTickFormater}
                  colType={selectedColumnDef.type}
                  colName={colName}
                  grpColorScale={grpColorScale}
                  isDateSelectedCol={isDateSelectedCol}
                  xAxisHeight={xAxisHeight}
                  legendStyle={legendStyle}
                  xAxisPadding={xAxisPadding} />
              </When>
              <When condition={chartType === 'line'}>
                <ChartExperimentalLineStuff
                  w={w}
                  h={h}
                  yAxisWidth={yAxisWidth}
                  isGroupBy={isGroupBy}
                  margin={margin}
                  domainMax={domainMax}
                  yTickCnt={yTickCnt}
                  minTickGap={minTickGap}
                  rowLabel={rowLabel}
                  fillColor={fillColor}
                  groupKeys={groupKeys}
                  chartData={chartData}
                  colName={colName}
                  xAxisHeight={xAxisHeight}
                  legendStyle={legendStyle}
                  valTickFormater={valTickFormater}
                  xAxisPadding={xAxisPadding}
                  grpColorScale={grpColorScale} />
              </When>
              <When condition={chartType === 'area'}>
                <ChartExperimentalAreaStuff
                  w={w}
                  h={h}
                  yAxisWidth={yAxisWidth}
                  isGroupBy={isGroupBy}
                  domainMax={domainMax}
                  margin={margin}
                  rowLabel={rowLabel}
                  valTickFormater={valTickFormater}
                  fillColor={fillColor}
                  minTickGap={minTickGap}
                  groupKeys={groupKeys}
                  chartData={chartData}
                  yTickCnt={yTickCnt}
                  xTickCnt={xTickCnt}
                  xAxisPadding={xAxisPadding}
                  grpColorScale={grpColorScale}
                  colName={colName}
                  xAxisHeight={xAxisHeight}
                  legendStyle={legendStyle} />
              </When>
              <Otherwise>
                <div>
                  hello world
                </div>
              </Otherwise>
            </Choose>
          </When>
          <Otherwise>
            <BlankChart />
          </Otherwise>
        </Choose>
      </div>
    )
  }
}

ChartExperimentalCanvas.propTypes = {
  chartData: PropTypes.array,
  chartType: PropTypes.string,
  groupKeys: PropTypes.array,
  columns: PropTypes.object,
  filters: PropTypes.object,
  rowLabel: PropTypes.string,
  selectedColumnDef: PropTypes.object,
  groupBy: PropTypes.string,
  sumBy: PropTypes.string
}

ChartExperimentalCanvas.defaultProps = {
  width: 800,
  height: 500
}
export default ChartExperimentalCanvas
