import React, { Component } from 'react'
import d3 from 'd3'
import { XAxis, BarChart, YAxis, CartesianGrid, Bar, Legend, Tooltip } from 'recharts'
import CustomYaxisLabel from './CustomYaxisLabel'
import CustomXaxisLabel from './CustomXaxisLabel'

class ChartExperimentalBarStuff extends Component {
  makeBars (groupKeys, grpColorScale) {
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
                fill={colorScale(colorIndex)} />)
          }
        })
        return bars
      }
    }
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
      if (chartData.length > 20) {
        chartProperties.layout = 'vertical'
        chartProperties.manyBars = true
      }
    }
    return chartProperties
  }
  render () {
    let {h, w, isGroupBy, margin, rowLabel, groupKeys, fillColor, chartData, yTickCnt, xTickCnt, valTickFormater, grpColorScale, colName, domainMax, isDateSelectedCol, minTickGap, legendStyle, xAxisHeight} = this.props
    let bars = this.makeBars(groupKeys, grpColorScale)
    let chartProperties = this.getChartProperties(chartData)
    let xpadding = {bottom: 300}
    return (
      <Choose>
        <When condition={isDateSelectedCol}>
          <Choose>
            <When condition={!isGroupBy}>
              <BarChart
                width={w}
                height={h}
                data={chartData}
                margin={margin}>
                <XAxis
                  dataKey='key'
                  type='category'
                  minTickGap={minTickGap}
                  label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGroups={0} />}
                  height={xAxisHeight} />
                <YAxis
                  tickFormatter={valTickFormater}
                  tickCount={yTickCnt}
                  domain={[0, domainMax]}
                  type='number'
                  label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />} />
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Bar dataKey='value' fill={fillColor} />
              </BarChart>
            </When>
            <Otherwise>
              <BarChart
                width={w}
                height={h}
                data={chartData}
                margin={margin}>
                <XAxis
                  dataKey='label'
                  type='category'
                  minTickGap={minTickGap}
                  label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={bars.length} />}
                  height={xAxisHeight} />
                <YAxis
                  tickFormatter={valTickFormater}
                  tickCount={yTickCnt}
                  domain={[0, domainMax]}
                  type='number'
                  label={<CustomYaxisLabel val={rowLabel + ' value'} h={h} />} />
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Legend wrapperStyle={legendStyle} />
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
                data={chartData}
                margin={margin}>
                <XAxis
                  tickFormatter={valTickFormater}
                  type='number'
                  tickCount={xTickCnt}
                  padding={xpadding}
                  domain={[0, domainMax]}
                  label={<CustomXaxisLabel val={'Number of ' + rowLabel + 's'} isGroupBy={isGroupBy} numOfGrps={0} />}
                  height={xAxisHeight} />
                <YAxis
                  dataKey='key'
                  label={<CustomYaxisLabel val={colName} h={h} />}
                  type='category' />
                <CartesianGrid strokeDasharray='3 3' horizontal={chartProperties.horizontal} vertical={chartProperties.vertical} />
                <Tooltip />
                <Bar dataKey='value' fill={fillColor} />
              </BarChart>
            </When>
            <When condition={!isGroupBy && !chartProperties.manyBars}>
              <BarChart
                width={w}
                height={h}
                data={chartData}
                margin={margin}>
                <XAxis
                  dataKey='key'
                  type='category'
                  label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGroups={0} />}
                  height={xAxisHeight} />
                <YAxis
                  tickFormatter={valTickFormater}
                  tickCount={yTickCnt}
                  domain={[0, domainMax]}
                  type='number'
                  label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />} />
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Bar dataKey='value' fill={fillColor} />
              </BarChart>
            </When>
            <When condition={isGroupBy && chartProperties.manyBars}>
              <BarChart
                width={w}
                height={h}
                layout={chartProperties.layout}
                data={chartData}
                margin={margin}>
                <XAxis
                  tickFormatter={valTickFormater}
                  tickCount={yTickCnt}
                  height={xAxisHeight}
                  domain={[0, domainMax]}
                  type='number'
                  label={<CustomXaxisLabel val={'Number of ' + rowLabel + 's'} isGroupBy={isGroupBy} numOfGrps={bars.length} />} />
                <YAxis
                  dataKey='label'
                  label={<CustomYaxisLabel val={colName} h={h} />}
                  type='category' />
                <CartesianGrid strokeDasharray='3 3' horizontal={chartProperties.horizontal} vertical={chartProperties.vertical} />
                <Tooltip />
                <Legend wrapperStyle={legendStyle} />
                {bars}
              </BarChart>
            </When>
            <When condition={isGroupBy && !chartProperties.manyBars}>
              <BarChart
                width={w}
                height={h}
                data={chartData}
                margin={margin}>
                <XAxis
                  dataKey='label'
                  type='category'
                  height={xAxisHeight}
                  label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={bars.length} />} />
                <YAxis
                  tickFormatter={valTickFormater}
                  tickCount={yTickCnt}
                  domain={[0, domainMax]}
                  type='number'
                  label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />} />
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <Tooltip />
                <Legend wrapperStyle={legendStyle} />
                {bars}
              </BarChart>
            </When>
          </Choose>
        </Otherwise>
      </Choose>
    )
  }
}

ChartExperimentalBarStuff.propTypes = {
  chartData: React.PropTypes.array,
  h: React.PropTypes.number,
  w: React.PropTypes.number,
  isGroupBy: React.PropTypes.bool,
  margin: React.PropTypes.object,
  rowLabel: React.PropTypes.string,
  groupKeys: React.PropTypes.array,
  fillColor: React.PropTypes.string
}

export default ChartExperimentalBarStuff
