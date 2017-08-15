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
              connectNulls={true}
              stackId='a'
              key={i}
              dot={false}
              isAnimationActive={false}
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
    let {h, w, isGroupBy, yAxisWidth, valTickFormater, margin, rowLabel, groupKeys, fillColor, chartData, xAxisPadding, domainMax, xAxisInterval,  colName, legendStyle, xAxisHeight, valueAxisTickLst} = this.props
    let lines = this.makeLines(groupKeys)
    let tickMax = valueAxisTickLst[valueAxisTickLst.length-1]
    legendStyle = this.setLegendStyleTop(lines, legendStyle)
    return (
      <Choose>
        <When condition={chartData.length > 0}>
          <Choose>
          <When condition={!isGroupBy}>
            <LineChart
              width={w}
              height={h}
              data={chartData}>
              <XAxis
                dataKey={'key'}
                interval={xAxisInterval}
                type={'category'}
                tickSize={4}
                label={colName}
                //strokeWidth={'10'}
                label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGroups={0} chartType={'line'} />}
                padding={xAxisPadding}
                height={xAxisHeight} />
              <CartesianGrid stroke='#eee' strokeDasharray='4 4' vertical={false} y={10} x={200} />
              <YAxis
                width={yAxisWidth}
                type={'number'}
                tickSize={3}
                ticks={valueAxisTickLst}
                domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h} chartType={'line'}/> }
                tickFormatter={valTickFormater} />
              <Line
                type={'linear'}
                strokeWidth={'3'}
                dataKey={'value'}
                dot={false}
                activeDot={true}
                stroke={fillColor}/>
                isAnimationActive={false} />
              <Tooltip />
            </LineChart>
          </When>
          <When condition={isGroupBy}>
            <LineChart
              width={w}
              height={h}
              data={chartData}
              margin={margin}>
              <XAxis
                dataKey={'label'}
                type={'category'}
                interval={xAxisInterval}
                height={xAxisHeight}
                tickSize={4}
                label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={lines.length} chartType={'line'} />}
                padding={xAxisPadding} />
              <YAxis
                width={yAxisWidth}
                type={'number'}
                allowDataOverflow={true}
                tickSize={3}
                ticks={valueAxisTickLst}
                domain={[0,  tickMax]}
                tickFormatter={valTickFormater}
                label={<CustomYaxisLabel val={'Number of ' + rowLabel + 's'} h={h}  chartType={'line'}/>} />
              <CartesianGrid  stroke='#eee' strokeDasharray='3 3' vertical={false} />
              <Tooltip />
              <Legend wrapperStyle={legendStyle} />
              {lines}
            </LineChart>
          </When>
        </Choose>
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
