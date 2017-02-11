import React, { Component } from 'react'
import d3 from 'd3'
import { XAxis, AreaChart, YAxis, CartesianGrid, Area, Legend, Tooltip } from 'recharts'
import CustomYaxisLabel from './CustomYaxisLabel'
import CustomXaxisLabel from './CustomXaxisLabel'

class ChartExperimentalAreaStuff extends Component {

  makeAreas (groupKeys, grpColorScale) {
    let areas = []
    if (groupKeys) {
      if (groupKeys.length > 1) {
        let colorScale = d3.scale.linear().domain([1, groupKeys.length])
          .interpolate(d3.interpolateHcl)
          .range([d3.rgb(grpColorScale['start']), d3.rgb(grpColorScale['end'])])
        areas = groupKeys.map(function (i) {
          if (i) {
            let colorIndex = groupKeys.indexOf(i)
            return (
              <Area
                type='monotone'
                dataKey={i}
                stackId='i'
                key={i}
                stroke={colorScale('colorIndex')}
                fill={colorScale(colorIndex)} />)
          }
        })
        return areas
      }
    }
  }
  render () {
    let {h, w, isGroupBy, margin, rowLabel, groupKeys, fillColor, chartData, yTickCnt, grpColorScale, valTickFormater, domainMax, minTickGap, xAxisHeight, legendStyle, colName} = this.props
    let areas = this.makeAreas(groupKeys, grpColorScale)

    return (
      <Choose>
        <When condition={!isGroupBy}>
          <AreaChart
            width={w}
            height={h}
            data={chartData}
            margin={margin}>
            <XAxis
              dataKey='key'
              minTickGap={minTickGap}
              height={xAxisHeight}
              label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={0} />} />
            <YAxis
              tickFormatter={valTickFormater}
              tickCount={yTickCnt}
              domain={[0, domainMax]}
              type='number'
              label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />} />
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='value'
              stroke={fillColor}
              fill={fillColor} />
          </AreaChart>
        </When>
        <When condition={isGroupBy}>
          <AreaChart
            width={w}
            height={h}
            data={chartData}
            margin={margin}>
            <XAxis
              dataKey='label'
              height={xAxisHeight}
              minTickGap={minTickGap}
              label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={areas.length} />} />
            <YAxis
              tickFormatter={valTickFormater}
              tickCount={yTickCnt}
              domain={[0, domainMax]}
              type='number'
              label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />} />
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <Tooltip />
            <Legend wrapperStyle={legendStyle} />
            {areas}
          </AreaChart>
        </When>
      </Choose>
    )
  }
}

ChartExperimentalAreaStuff.propTypes = {
  chartData: React.PropTypes.array,
  h: React.PropTypes.number,
  w: React.PropTypes.number,
  chartProperties: React.PropTypes.object,
  isGroupBy: React.PropTypes.bool,
  margin: React.PropTypes.object,
  rowLabel: React.PropTypes.string,
  groupKeys: React.PropTypes.array,
  fillColor: React.PropTypes.string
}

export default ChartExperimentalAreaStuff
