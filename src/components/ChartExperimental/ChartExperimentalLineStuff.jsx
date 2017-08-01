import React, { Component } from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'
import { XAxis, LineChart, YAxis, CartesianGrid, Line, Legend, Tooltip } from 'recharts'
import CustomYaxisLabel from './CustomYaxisLabel'
import CustomXaxisLabel from './CustomXaxisLabel'
class ChartExperimentalLineStuff extends Component {

  makeLines (groupKeys) {
    let lines = []
    if (groupKeys && groupKeys.length > 0) {
      let colorScale = d3.scale.linear().domain([1, groupKeys.length])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb('#007AFF'), d3.rgb('#FFF500')])
      lines = groupKeys.map(function (i) {
        if (i) {
          let colorIndex = groupKeys.indexOf(i)
          return (
            <Line
              type='linear'
              dataKey={i}
              stackId='a'
              key={i}
              dot={false}
              stroke={colorScale(colorIndex)} />)
        }
        return false
      })
      return lines
    }
  }
  setLegendStyleTop(lines, legendStyle){
    if(lines){
      if(lines.length <= 20){
        legendStyle.top = '-20%'
      }
      if(lines.length > 20 && lines.length <= 30){
        legendStyle.top = '-25%'
      }
      if(lines.length > 30 && lines.length <= 40){
        legendStyle.top = '-30%'
      }
      if(lines.length > 40 ){
        legendStyle.top = '-30%'
      }
    }
    return legendStyle
  }
  render () {
    let {h, w, isGroupBy, yAxisWidth, valTickFormater, margin, rowLabel, groupKeys, fillColor, chartData, xAxisPadding, domainMax, yTickCnt, xAxisInterval,  colName, legendStyle, xAxisHeight} = this.props
    let lines = this.makeLines(groupKeys)
    legendStyle = this.setLegendStyleTop(lines, legendStyle)
    return (
      <Choose>
        <When condition={!isGroupBy}>
          <LineChart
            width={w}
            height={h}
            isAnimationActive={false}
            data={chartData}>
            <XAxis
              dataKey={'key'}
              allowDataOverflow={true}
              interval={xAxisInterval}
              type={'category'}
              tickSize={4}
              label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGroups={0} chartType={'line'} />}
              padding={xAxisPadding}
              height={xAxisHeight} />
            <CartesianGrid stroke='#eee' strokeDasharray='3 3' vertical={false} />
            <YAxis
              width={yAxisWidth}
              type={'number'}
              tickSize={3}
              allowDataOverflow={true}
              tickCount={yTickCnt}
              label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} chartType={'line'}/>}
              tickFormatter={valTickFormater}
              domain={[0, domainMax]} />
            <Line
              type='linear'
              strokeWidth='3'
              dataKey='value'
              dot={false}
              stroke={fillColor} />
            <Tooltip />
          </LineChart>
        </When>
        <When condition={isGroupBy}>
          <LineChart
            width={w}
            height={h}
            data={chartData}
            margin={margin}
            isAnimationActive={false} >
            <XAxis
              dataKey={'label'}
              type={'category'}
              interval={xAxisInterval}
              allowDataOverflow={true}
              height={xAxisHeight}
              tickSize={4}
              label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={lines.length} chartType={'line'} />}
              padding={xAxisPadding} />
            <YAxis
              tickFormatter={valTickFormater}
              type={'number'}
              tickCount={ yTickCnt}
              allowDataOverflow={true}
              domain={[0, domainMax]}
              label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h}  chartType={'line'}/>} />
            <CartesianGrid stroke='#eee' strokeDasharray='3 3' vertical={false} />
            <Legend wrapperStyle={legendStyle} />
            <Tooltip />
            {lines}

          </LineChart>
        </When>
      </Choose>
    )
  }
}

ChartExperimentalLineStuff.propTypes = {
  chartData: PropTypes.array,
  h: PropTypes.number,
  w: PropTypes.number,
  chartProperties: PropTypes.object,
  isGroupBy: PropTypes.bool,
  margin: PropTypes.object,
  rowLabel: PropTypes.string,
  groupKeys: PropTypes.array,
  fillColor: PropTypes.string
// valTickFormater: PropTypes.function
}

export default ChartExperimentalLineStuff
