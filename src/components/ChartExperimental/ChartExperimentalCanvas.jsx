/* global Choose, When, Otherwise */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import d3 from 'd3'
import BlankChart from './BlankChart'
import ChartExperimentalBarStuff from './ChartExperimentalBarStuff'
import ChartExperimentalLineStuff from './ChartExperimentalLineStuff'
import ChartExperimentalAreaStuff from './ChartExperimentalAreaStuff'
import ChartExperimentalHistogramStuff from './ChartExperimentalHistogramStuff'
import { findMaxObjKeyValue, isColTypeTest, sumObj, sortObj, transformOthers , fillArray} from '../../helpers'

class ChartExperimentalCanvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: this.props.width,
      height: this.props.height
    }
  }

  componentDidMount () {
    this.updateSize()
    window.addEventListener('resize', this.updateSize.bind(this))
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize.bind(this))
  }

  updateSize () {
    var ReactDOM = require('react-dom')
    var node = ReactDOM.findDOMNode(this)
    var parentWidth = node.getBoundingClientRect().width

    if (!(parentWidth === this.props.width)) {
      this.setState({width: parentWidth - 20})
    } else {
      this.setState({width: this.props.width})
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

    return !isEqual(thisChart, nextChart) && !nextProps.isFetching
  }

  findMaxObjKeyValueGrpByUnStacked(chartData){
    let allVals = []
    chartData.forEach(function(item){
      let itemCopy = Object.assign({}, item);
      delete itemCopy.label
      let itemVals = Object.values(itemCopy)
      let itemMax = Math.max.apply(null, itemVals)
      allVals.push(itemMax)
    })
    return Math.max.apply(null, allVals)
  }

  findMaxObjKeyValueGrpByStacked(chartData){
    let allVals = []
    chartData.forEach(function(item){
      let itemCopy = Object.assign({}, item);
      delete itemCopy.label
      let colSum = Object.values(itemCopy).reduce((a, b) => a + b, 0)
      allVals.push(colSum)
    })
    return Math.max.apply(null, allVals)
  }

  setXAxisTickInterval(dateBy, chartData){
    return Math.round(chartData.length * 0.09)
  }

  getMaxGrpBy (chartType, chartData) {
    if (chartType === 'line') {
      return this.findMaxObjKeyValueGrpByUnStacked(chartData)
    } else {
      return this.findMaxObjKeyValueGrpByStacked(chartData)
    }
  }

  roundNumberByPower (num, tensBaseToRoundTo) {
    return Math.ceil(num/tensBaseToRoundTo)*tensBaseToRoundTo
  }

  findCeiling (maxValue, maxPowerOf10) {
    let zerosRange = Array.apply(null, Array(maxPowerOf10)).map(function (_, i) { return i })
    for (let i = 1; i < zerosRange.length; i++) {
      let zeros = Math.pow(10, zerosRange[i])
      let zerosNext = Math.pow(10, zerosRange[i + 1])
      if ((zeros < maxValue) && (zerosNext > maxValue)) {
        if (i != 0) {
          return Math.pow(10, zerosRange[i -1])
        } else {
          return zeros
        }
      }
    }
  }

  roundAxisZeros (maxValue, numberOfTicks, maxPowerOf10) {
    // rounds the max value to nearest ceiling
    let valueAxisTickLst = []
    let valueAxisTickIncrement = Math.round(maxValue, 0)
    if (maxValue < 50) {
      valueAxisTickIncrement = Math.round((maxValue / (numberOfTicks-1)), 2)
    } else {
      let powerToRound = this.findCeiling(maxValue, maxPowerOf10)
      valueAxisTickIncrement = this.roundNumberByPower((maxValue / numberOfTicks), powerToRound)
    }
    let valueAxisTickIncrementLast = 0
    for (let i = 0; i < numberOfTicks; i++) {
      if (valueAxisTickIncrementLast < (maxValue + valueAxisTickIncrement)) {
        valueAxisTickLst.push(valueAxisTickIncrementLast)
        valueAxisTickIncrementLast = valueAxisTickIncrementLast + valueAxisTickIncrement
      } else {
        break
      }
    }
    return valueAxisTickLst
  }

  setFontSizeTicks(domainMax){
    if(String(Math.round(domainMax,0)).length >= 6) {
      return {'fontSize':'85%'}
    }
    return {'fontSize':'100%'}
  }

  makeHistogramData(chartData, w ){
    let freqs = this.explodeFrequencies(chartData)
    let xScale = this.getXScale(freqs, w)
    let histogramDataFn = d3.layout.histogram().bins(xScale.ticks(15))
    let histogramData = histogramDataFn(freqs)
    console.log("**** histogram****")
    console.log(chartData)
    console.log("*******")
  }


  render () {
    let {rowLabel, selectedColumnDef, groupKeys, chartData, chartType, rollupBy, dateBy, isFetching, isGroupBy, numericCol, isDateSelectedCol, domainMax, colName } = this.props
    //chartType = this.setDefaultChartType(selectedColumnDef, chartType)
    let dx = 0
    let margin = {top: 1, right: 5, bottom: 1, left: 5}
    //console.log("group by***")
    // console.log(isSelectedColDate)
    //console.log(isGroupBy)
    //console.log(isDateSelectedCol)
    let w = this.state.width - (margin.left + margin.right)
    let h = this.state.height - (margin.top + margin.bottom)


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
    let xAxisInterval = this.setXAxisTickInterval(dateBy, chartData)
    //let domainMax
    //let isDateSelectedCol = false
    let maxValue, valTickFormater, valueTickStyle
    let formatValue = d3.format('0,000')
    //let numericCol = isColTypeTest(selectedColumnDef, 'number')
    console.log("**** numberic col***")
    console.log(numericCol)
    console.log("***domainMax***")
    console.log(domainMax)
    //let isGroupBy = this.isGroupByz(groupKeys)
    //if(isGroupBy && groupKeys.length === 1){
    //  isGroupBy = false
    //}
    //if(!isGroupBy){
    //  maxValue = findMaxObjKeyValue(chartData, 'value')
    //}else{
    //  maxValue = this.getMaxGrpBy (chartType, chartData)
    //}

    valTickFormater = function (d) { return formatValue(d) }

    //if( 1 > maxValue){
    //  domainMax = maxValue * 2
    //}
    //else if (1 < maxValue < 5){
    //  domainMax = maxValue * 1.3
    //}
    //else if (5 < maxValue < 10){
    //  domainMax = maxValue * 1.10
    //}
    //else {
    //  domainMax = maxValue * 1.03
    //}
    // console.log("***max is here")
    // console.log(domainMax)
    let yTickCnt = 10
    let valueAxisTickLst = []
    if (domainMax > 0) {
      valueAxisTickLst = this.roundAxisZeros(domainMax, yTickCnt, 8)
      valueTickStyle = this.setFontSizeTicks(domainMax)
    }
    //chartData = this.convertChartData(chartData, selectedColumnDef, dateBy, isGroupBy)
    if (selectedColumnDef) {
      fillColor = fillColorIndex[selectedColumnDef.type]
      grpColorScale = groupByColorIndex[selectedColumnDef.type]
      //isDateSelectedCol = this.isSelectedColDate(selectedColumnDef)
      //colName = selectedColumnDef.name
    }
    let xAxisPadding = { left: 30, right: 30 }
    let xTickCnt = 6
    let xAxisHeight = 100
    let legendStyle = {
      color: '#666',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width:'70%',
      position:'relative',
      paddingTop:'1%',
      paddingBottom:'1%',
      wordBreak: 'break-all',
      textAlign: 'left'
    }
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
          <When condition={selectedColumnDef && !isFetching}>
            <Choose>
              <When condition={numericCol}>
                <Choose>
                  <When condition={chartType === 'histogram'}>
                    <ChartExperimentalHistogramStuff
                      w={w}
                      h={h}
                      yAxisWidth={yAxisWidth}
                      xAxisHeight={xAxisHeight}
                      isGroupBy={isGroupBy}
                      margin={margin}
                      dx={dx}
                      valueAxisTickLst={valueAxisTickLst}
                      rowLabel={rowLabel}
                      fillColor={fillColor}
                      colName={colName}
                      groupKeys={groupKeys}
                      chartData={chartData}
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
                  valueAxisTickLst={valueAxisTickLst}
                  xAxisPadding={xAxisPadding}
                  xTickCnt={xTickCnt}
                  valTickFormater={valTickFormater}
                  colType={selectedColumnDef.type}
                  colName={colName}
                  xAxisInterval={xAxisInterval}
                  grpColorScale={grpColorScale}
                  isDateSelectedCol={isDateSelectedCol}
                  xAxisHeight={xAxisHeight}
                  legendStyle={legendStyle}/>
              </When>
              <When condition={chartType === 'line'}>
                <ChartExperimentalLineStuff
                  w={w}
                  h={h}
                  isGroupBy={isGroupBy}
                  margin={margin}
                  domainMax={domainMax}
                  rowLabel={rowLabel}
                  fillColor={fillColor}
                  groupKeys={groupKeys}
                  chartData={chartData}
                  colName={colName}
                  yTickCnt={yTickCnt}
                  valueAxisTickLst={valueAxisTickLst}
                  xTickCnt={xTickCnt}
                  xAxisHeight={xAxisHeight}
                  yAxisWidth={yAxisWidth}
                  xAxisInterval={xAxisInterval}
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
                  legendStyle={legendStyle}
                  minTickGap={minTickGap}
                  xAxisInterval={xAxisInterval}
                  groupKeys={groupKeys}
                  chartData={chartData}
                  valueAxisTickLst={valueAxisTickLst}
                  valueTickStyle={valueTickStyle}
                  xTickCnt={xTickCnt}
                  xAxisPadding={xAxisPadding}
                  grpColorScale={grpColorScale}
                  colName={colName}
                  xAxisHeight={xAxisHeight}/>
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
