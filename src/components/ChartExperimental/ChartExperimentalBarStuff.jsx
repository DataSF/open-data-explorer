import React, { Component } from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'
import { XAxis, BarChart, YAxis, CartesianGrid, Bar, Legend, Tooltip } from 'recharts'
import CustomYaxisLabel from './CustomYaxisLabel'
import CustomXaxisLabel from './CustomXaxisLabel'
import CustomKeyAxisTick from './CustomKeyAxisTick'

class ChartExperimentalBarStuff extends Component {
//  // unit={" " + rowLabel}
//  label={barLabelStyle}

  makeBars (groupKeys, grpColorScale, rowLabel) {
    let bars = []
    if (groupKeys) {
      if (groupKeys.length > 1) {
        let colorScale = d3.scale.linear().domain([1, groupKeys.length])
          .interpolate(d3.interpolateHcl)
          .range([d3.rgb(grpColorScale['start']), d3.rgb(grpColorScale['end'])])
        bars = groupKeys.map(function (i) {
          if (i) {
            let colorIndex = groupKeys.indexOf(i)
            return (
              <Bar
                dataKey={i}
                stackId='a'
                key={i}
                // unit={" " + rowLabel}
                fill={colorScale(colorIndex)} />)
          }
          return false
        })
        return bars
      }
    }
    return bars
  }

  getChartProperties (chartData) {
    let chartProperties = {}
    if (chartData) {
      chartProperties = {
        horizontal: false,
        vertical: true,
        manyBars: false,
        layout: 'horizontal'
      }
      if (chartData.length > 5) {
        chartProperties.layout = 'vertical'
        chartProperties.manyBars = true
      }
    }
    return chartProperties
  }
  /*
  setLegendStyleTop(bars, legendStyle){
    if(bars){
      if(bars.length <= 20){
        legendStyle.top = '-20%'
      }
      if(bars.length > 20 && bars.length <= 30){
        legendStyle.top = '-25%'
      }
      if(bars.length > 30 && bars.length <= 40){
        legendStyle.top = '-30%'
      }
      if(bars.length > 40 ){
        legendStyle.top = '-30%'
      }
    }
    return legendStyle
  }*/
  render () {
    let {h, w, xAxisInterval, xAxisPadding, isGroupBy, rowLabel, units, groupKeys, fillColor, chartData, valTickFormater, grpColorScale, colName, isDateSelectedCol, legendStyle, xAxisHeight, yAxisWidth, valueAxisTickLst} = this.props
    let bars = this.makeBars(groupKeys, grpColorScale, rowLabel)
    let chartProperties = this.getChartProperties(chartData)
    let xpadding = {bottom: 300}
    //const barLabelStyle = { fill: '#133140', fontSize: '15px', paddingBottom:'15px'}
    //legendStyle = this.setLegendStyleTop(bars, legendStyle)
    return (
      <Choose>
      <When condition={chartData.length > 0}>
      <Choose>
        <When condition={isDateSelectedCol}>
          <Choose>
            <When condition={!isGroupBy}>
              <BarChart
                width={w}
                height={h}
                data={chartData} >
                <XAxis
                  dataKey={'key'}
                  interval={xAxisInterval}
                  type={'category'}
                  tickSize={4}
                  label={colName}
                  height={xAxisHeight} />
                <YAxis
                  tickFormatter={valTickFormater}
                  ticks={valueAxisTickLst}
                  tickSize={3}
                  domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                  type={'number'}
                  label={<CustomYaxisLabel val={'Number of ' + units } h={h} chartType={'line'} />}
                  width={yAxisWidth} />
                <CartesianGrid stroke='#eee' strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Bar dataKey={'value'}
                    fill={fillColor} />
              </BarChart>
            </When>
            <Otherwise>
              <BarChart
                width={w}
                height={h}
                data={chartData}>
                <XAxis
                  dataKey={'label'}
                  interval={xAxisInterval}
                  type={'category'}
                  height={xAxisHeight}
                  tickSize={4}
                  label={colName} />
                <YAxis
                  tickFormatter={valTickFormater}
                  // tickCount={yTickCnt}
                  ticks={valueAxisTickLst}
                  tickSize={3}
                  domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                  width={yAxisWidth}
                  type={'number'}
                  label={<CustomYaxisLabel val={'Number of ' + units} h={h} chartType={'line'} />} />
                <CartesianGrid stroke='#eee' strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Legend layout='vertical' verticalAlign='top' align='right' wrapperStyle={legendStyle} />
                {bars}
              </BarChart>
            </Otherwise>
          </Choose>
        </When>
        <Otherwise>
          <Choose>
            <When condition={!isGroupBy && chartProperties.manyBars}>
              <BarChart
                width={w}
                height={h}
                layout={chartProperties.layout}
                data={chartData} >
                <XAxis
                  tickFormatter={valTickFormater}
                  type={'number'}
                  //tickCount={xTickCnt}
                  ticks={valueAxisTickLst}
                  //padding={xpadding}
                  tickSize={4}
                  domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                  label={'Number of ' + units}
                  height={xAxisHeight} />
                <YAxis
                  dataKey={'key'}
                  label={<CustomYaxisLabel val={colName} h={h} />}
                  type='category'
                  tickSize={3}
                  tick={<CustomKeyAxisTick />}
                  width={yAxisWidth} />
                <CartesianGrid stroke='#eee' strokeDasharray='3 3' horizontal={chartProperties.horizontal} vertical={chartProperties.vertical} />
                <Tooltip />
                <Bar dataKey='value'
                fill={fillColor}  />
              </BarChart>
            </When>
            <When condition={!isGroupBy && !chartProperties.manyBars}>
              <BarChart
                width={w}
                height={h}
                data={chartData}>
                <XAxis
                  dataKey={'key'}
                  type={'category'}
                  label={colName}
                  tickSize={4}
                  height={xAxisHeight} />
                <YAxis
                  tickFormatter={valTickFormater}
                  //tickCount={yTickCnt}
                  ticks={valueAxisTickLst}
                  domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                  type={'number'}
                  width={yAxisWidth}
                  tickSize={3}
                  label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />} />
                <CartesianGrid stroke='#eee' strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Bar dataKey={'value'}
                    fill={fillColor}/>
              </BarChart>
            </When>
            <When condition={isGroupBy && chartProperties.manyBars}>
              <BarChart
                width={w}
                height={h}
                layout={chartProperties.layout}
                data={chartData}>
                <XAxis
                  tickFormatter={valTickFormater}
                  // tickCount={yTickCnt}
                  tickSize={4}
                  ticks={valueAxisTickLst}
                  height={xAxisHeight}
                  domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                  type={'number'}
                  label={'Number of ' + units} />
                <YAxis
                  dataKey={'label'}
                  width={yAxisWidth}
                  tickSize={3}
                  tick={< CustomKeyAxisTick />}
                  label={<CustomYaxisLabel val={colName} h={h} />}
                  type={'category'} />
                <CartesianGrid stroke='#eee' strokeDasharray='3 3' horizontal={chartProperties.horizontal} vertical={chartProperties.vertical} />
                <Tooltip />
                <Legend layout='vertical' verticalAlign='top' align='right' wrapperStyle={legendStyle} />
                {bars}
              </BarChart>
            </When>
            <When condition={isGroupBy && !chartProperties.manyBars}>
              <BarChart
                width={w}
                height={h}
                data={chartData}>
                <XAxis
                  dataKey={'label'}
                  type={'category'}
                  height={xAxisHeight}
                  tickSize={4}
                  label={colName} />
                <YAxis
                  tickFormatter={valTickFormater}
                  ticks={valueAxisTickLst}
                  domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                  type={'number'}
                  width={yAxisWidth}
                  tickSize={3}
                  label={<CustomYaxisLabel val={'Number of ' + units} h={h} />} />
                <CartesianGrid  stroke='#eee' strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Legend layout='vertical' verticalAlign='top' align='right' wrapperStyle={legendStyle} />
                {bars}
              </BarChart>
            </When>
          </Choose>
        </Otherwise>
      </Choose>
      </When>
      </Choose>
    )
  }
}

ChartExperimentalBarStuff.propTypes = {
  chartData: PropTypes.array,
  h: PropTypes.number,
  w: PropTypes.number,
  isGroupBy: PropTypes.bool,
  margin: PropTypes.object,
  rowLabel: PropTypes.string,
  groupKeys: PropTypes.array,
  fillColor: PropTypes.string
}

export default ChartExperimentalBarStuff
