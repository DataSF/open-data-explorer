import React, { Component } from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'
import { XAxis, AreaChart, YAxis, CartesianGrid, Area, Legend, Tooltip } from 'recharts'
import CustomYaxisLabel from './CustomYaxisLabel'
import CustomXaxisLabel from './CustomXaxisLabel'

class ChartExperimentalAreaStuff extends Component {

  makeAreas (groupKeys, grpColorScale, units) {
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
                type='linear'
                dataKey={i}
                stackId='i'
                key={i}
                unit={" " + units}
                stroke={colorScale('colorIndex')}
                fill={colorScale(colorIndex)} />)
          }
          return false
        })
        return areas
      }
    }
  }
  setLegendStyleTop(areas, legendStyle){
    if(areas){
      if(areas.length <= 20){
        legendStyle.top = '-20%'
      }
      if(areas.length > 20 && areas.length <= 30){
        legendStyle.top = '-25%'
      }
      if(areas.length > 30 && areas.length <= 40){
        legendStyle.top = '-30%'
      }
      if(areas.length > 40 ){
        legendStyle.top = '-30%'
      }
    }
    return legendStyle
  }
  render () {
    let {h, w, xAxisPadding, xAxisInterval, isGroupBy, margin, yAxisWidth, units, groupKeys, fillColor, chartData, grpColorScale, valTickFormater, xAxisHeight, legendStyle, colName, valueAxisTickLst, valueTickStyle} = this.props
    let areas = this.makeAreas(groupKeys, grpColorScale, units)
    legendStyle = this.setLegendStyleTop(areas, legendStyle)
    return (
      <Choose>
        <When condition={chartData.length > 0}>
          <Choose>
          <When condition={!isGroupBy}>
            <AreaChart
              width={w}
              height={h}
              data={chartData}
              margin={margin}>
              <XAxis
                dataKey='key'
                height={xAxisHeight}
                interval={xAxisInterval}
                type={'category'}
                tickSize={4}
                label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGroups={0} chartType={'area'} />}
                //label={colName}
                padding={xAxisPadding}/>
              <YAxis
                style={valueTickStyle}
                width={yAxisWidth}
                domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                ticks={valueAxisTickLst}
                tickFormatter={valTickFormater}
                type={'number'}
                label={<CustomYaxisLabel val={'Number of ' + units} h={h} chartType={'area'} />} />
              <CartesianGrid  stroke='#eee' strokeDasharray='3 3' vertical={false} />
              <Tooltip />
              <Area
                type='linear'
                dataKey='value'
                stroke={fillColor}
                fill={fillColor}
                unit={" " + units} />
            </AreaChart>
          </When>
          <When condition={isGroupBy}>
            <AreaChart
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
                padding={xAxisPadding}
                label={<CustomXaxisLabel val={colName} isGroupBy={isGroupBy} numOfGrps={areas.length} chartType={'area'} />} />
              <YAxis
                tickFormatter={valTickFormater}
                domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]}
                ticks={valueAxisTickLst}
                type={'number'}
                label={<CustomYaxisLabel val={'Number of ' + units} h={h}   chartType={'area'}/>} />
              <CartesianGrid  stroke='#eee' strokeDasharray='3 3' vertical={false} />
              <Tooltip />
              <Legend wrapperStyle={legendStyle} />
              {areas}
            </AreaChart>
          </When>
        </Choose>
        </When>
      </Choose>
    )
  }
}

ChartExperimentalAreaStuff.propTypes = {
  chartData: PropTypes.array,
  h: PropTypes.number,
  w: PropTypes.number,
  chartProperties: PropTypes.object,
  isGroupBy: PropTypes.bool,
  margin: PropTypes.object,
  rowLabel: PropTypes.string,
  units: PropTypes.string,
  groupKeys: PropTypes.array,
  fillColor: PropTypes.string
}

export default ChartExperimentalAreaStuff
