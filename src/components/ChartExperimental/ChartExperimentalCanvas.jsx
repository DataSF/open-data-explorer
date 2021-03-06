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
import ReactDOM from 'react-dom'


class ChartExperimentalCanvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: this.props.width,
      height: this.props.height
    }

    this._isMounted = false
    this._updateSize = this._updateSize.bind(this)
    this._getChartTitleHeight = this._getChartTitleHeight.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this._updateSize()
    window.addEventListener('resize', this._updateSize)
  }

  componentWillUnmount () {
    this._isMounted = false
    window.removeEventListener('resize', this._updateSize)
  }

  _updateSize () {
    if (this._isMounted) {
      var node = ReactDOM.findDOMNode(this)
      var parentWidth = node.getBoundingClientRect().width

      if (!(parentWidth === this.props.width)) {
        this.setState({width: parentWidth - 20})
      } else {
        this.setState({width: this.props.width})
      }
    }
  }

  _getChartTitleHeight () {
    // TODO: get by ref
    let chartTitleHeight = document.getElementsByClassName('Chart__title')[0] ? document.getElementsByClassName('Chart__title')[0].clientHeight : 35
    return chartTitleHeight
  }

  shouldComponentUpdate (nextProps, nextState) {
    /*
    This component needs to be refactored to handle resizing on a container, for now, we'll update the component always
    We should also not rerender the char
    */
    let thisChartLen, nextChartLen, nextchartColorsGrpByLen, thischartColorsGrpByLen    = 0
    if(Object.keys(this.props).indexOf('chartData') > -1) {
      thisChartLen = this.props.chartData.length
    }
    if(Object.keys(nextProps).indexOf('chartData') > -1) {
      nextChartLen = nextProps.chartData.length
    }
    if(Object.keys(nextProps).indexOf('chartColorsGrpBy') > -1) {
      nextchartColorsGrpByLen = nextProps.chartColorsGrpBy.length
    }
    if(Object.keys(this.props).indexOf('chartColorsGrpBy') > -1) {
      thischartColorsGrpByLen = this.props.chartColorsGrpBy.length
    }
    let thisChart = {
      chartData: this.props.chartData,
      chartType: this.props.chartType,
      height: this.props.viewportHeight,
      width: this.state.width,
      chartColor: this.props.chartColor,
      chartDataLen: nextChartLen,
      chartColorsGrpBy: thischartColorsGrpByLen,
    }
    let nextChart = {
      chartType: nextProps.chartType,
      chartData: nextProps.chartData,
      height: nextProps.viewportHeight,
      width: nextState.width,
      chartColor: nextProps.chartColor,
      chartColorsGrpBy: nextchartColorsGrpByLen,
      chartDataLen: thisChartLen,
    }
    return ( (!isEqual(thisChart, nextChart)) && !nextProps.isFetching)
  }



  setFontSizeTicks(domainMax){
    if(String(Math.round(domainMax,0)).length >= 6) {
      return {'fontSize':'85%'}
    }
    return {'fontSize':'100%'}
  }




  render () {
    let {rowLabel, units, viewportHeight, topOffset, selectedColumnDef, groupKeys, chartData, chartType, isFetching, isGroupBy, isDateSelectedCol, domainMax, colName, valueAxisTickLst, xAxisInterval, freqs, yTickCnt, xTickCnt, maxPowerOf10, chartColor, chartColorsGrpBy} = this.props
    const formatValue = d3.format('0,000')
    const valTickFormater = function (d) { return formatValue(d) }
    const xAxisPadding = { left: 30, right: 30 }
    const chartMargin = {top: 1, right: 5, bottom: 1, left: 5}
    /* const fillColorIndex = {
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

    const legendStyle = {
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
    }*/
    const xAxisHeight = 100
    const yAxisWidth = 70
    let w = this.state.width - (chartMargin.left + chartMargin.right)
    let h = viewportHeight - (chartMargin.top + chartMargin.bottom) - topOffset - this._getChartTitleHeight() - 50
    let fillColor, valueTickStyle
    //grpColorScale

    const legendStyle = {
      color: '#666',
      maxWidth: '200px',
      paddingLeft: '10px',
      height: h,
      overflowY: 'scroll'
    }

    if (domainMax > 0) {
      valueTickStyle = this.setFontSizeTicks(domainMax)
    }
    if (selectedColumnDef) {
      fillColor = chartColor
    }

    let minTickGap = 200

    return (
      <div className='chartCanvas'>
        <Choose>
          <When condition={selectedColumnDef && !isFetching && chartData.length > 0 && valueAxisTickLst.length > 0}>
            <Choose>
              <When condition={chartType === 'histogram'}>
                <ChartExperimentalHistogramStuff
                  w={w}
                  h={h}
                  yAxisWidth={yAxisWidth}
                  xAxisHeight={xAxisHeight}
                  isGroupBy={isGroupBy}
                  margin={chartMargin}
                  freqs={freqs}
                  valueAxisTickLst={valueAxisTickLst}
                  rowLabel={rowLabel}
                  fillColor={fillColor}
                  colName={colName}
                  groupKeys={groupKeys}
                  xTickCnt={xTickCnt}
                  yTickCnt={yTickCnt}
                  maxPowerOf10={maxPowerOf10}
                  xAxisPadding={xAxisPadding}
                  valTickFormater={valTickFormater} />
              </When>
              <When condition={chartType === 'bar'}>
                <ChartExperimentalBarStuff
                  w={w}
                  h={h}
                  yAxisWidth={yAxisWidth}
                  minTickGap={minTickGap}
                  domainMax={domainMax}
                  isGroupBy={isGroupBy}
                  margin={chartMargin}
                  rowLabel={rowLabel}
                  units={units}
                  fillColor={fillColor}
                  groupKeys={groupKeys}
                  chartData={chartData}
                  valueAxisTickLst={valueAxisTickLst}
                  xAxisPadding={xAxisPadding}
                  xTickCnt={xTickCnt}
                  valTickFormater={valTickFormater}
                  colType={selectedColumnDef.type}
                  colName={colName}
                  xAxisInterval={xAxisInterval}
                  chartColorsGrpBy={chartColorsGrpBy}
                  isDateSelectedCol={isDateSelectedCol}
                  xAxisHeight={xAxisHeight}
                  legendStyle={legendStyle}/>
              </When>
              <When condition={chartType === 'line'}>
                <ChartExperimentalLineStuff
                  w={w}
                  h={h}
                  isGroupBy={isGroupBy}
                  margin={chartMargin}
                  domainMax={domainMax}
                  rowLabel={rowLabel}
                  units={units}
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
                  chartColorsGrpBy={chartColorsGrpBy} />
              </When>
              <When condition={chartType === 'area'}>
                <ChartExperimentalAreaStuff
                  w={w}
                  h={h}
                  yAxisWidth={yAxisWidth}
                  isGroupBy={isGroupBy}
                  domainMax={domainMax}
                  margin={chartMargin}
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
                  chartColorsGrpBy={chartColorsGrpBy}
                  colName={colName}
                  units={units}
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
