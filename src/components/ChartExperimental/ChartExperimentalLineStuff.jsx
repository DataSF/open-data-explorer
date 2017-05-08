import React, { Component } from 'react'
import d3 from 'd3'
import { XAxis, LineChart, YAxis, CartesianGrid, Line, Legend, Tooltip } from 'recharts'
import CustomYaxisLabel from './CustomYaxisLabel'
import CustomXaxisLabel from './CustomXaxisLabel'
class ChartExperimentalLineStuff extends Component {

  makeLines (groupKeys) {
    let lines = []
    if (groupKeys) {
      if (groupKeys.length > 1) {
        let colorScale = d3.scale.linear().domain([1, groupKeys.length])
          .interpolate(d3.interpolateHcl)
          .range([d3.rgb('#007AFF'), d3.rgb('#FFF500')])
        lines = groupKeys.map(function (i) {
          if (i) {
            let colorIndex = groupKeys.indexOf(i)
            return (
              <Line
                type='monotone'
                dataKey={i}
                stackId='a'
                key={i}
                stroke={colorScale(colorIndex)} />)
          }
          return false
        })
        return lines
      }
    }
  }
  render () {
    let {h, w, isGroupBy, yAxisWidth, valTickFormater, margin, rowLabel, groupKeys, fillColor, chartData, xAxisPadding, domainMax, minTickGap, yTickCnt, colName, legendStyle, xAxisHeight} = this.props
    let lines = this.makeLines(groupKeys)

    return (
      <Choose>
        <When condition={!isGroupBy}>
          <LineChart width={w} height={h} data={chartData}>
            <XAxis
              dataKey='key'
              label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGroups={0} />}
              minTickGap={minTickGap}
              padding={xAxisPadding}
              height={xAxisHeight} />
            <YAxis
              width={yAxisWidth}
              type='number'
              label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />}
              tickCount={yTickCnt}
              tickFormatter={valTickFormater}
              domain={[0, domainMax]} />
            <CartesianGrid stroke='#eee' strokeDasharray='3 3' vertical={false} />
            <Line
              type='monotone'
              strokeWidth='3'
              dataKey='value'
              stroke={fillColor} />
            <Tooltip />
          </LineChart>
        </When>
        <When condition={isGroupBy}>
          <LineChart
            width={w}
            height={h}
            data={chartData}
            margin={margin} >
            <XAxis
              dataKey='label'
              height={xAxisHeight}
              label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={lines.length} />}
              minTickGap={minTickGap}
              padding={xAxisPadding} />
            <YAxis
              tickFormatter={valTickFormater}
              tickCount={yTickCnt}
              domain={[0, domainMax]}
              label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} />} />
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <Tooltip />
            {lines}
            <Legend wrapperStyle={legendStyle} />
          </LineChart>
        </When>
      </Choose>
    )
  }
}

ChartExperimentalLineStuff.propTypes = {
  chartData: React.PropTypes.array,
  h: React.PropTypes.number,
  w: React.PropTypes.number,
  chartProperties: React.PropTypes.object,
  isGroupBy: React.PropTypes.bool,
  margin: React.PropTypes.object,
  rowLabel: React.PropTypes.string,
  groupKeys: React.PropTypes.array,
  fillColor: React.PropTypes.string
// valTickFormater: React.PropTypes.function
}

export default ChartExperimentalLineStuff
