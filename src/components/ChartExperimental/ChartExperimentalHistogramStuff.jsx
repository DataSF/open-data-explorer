import React, { Component } from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'
import { XAxis, BarChart, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts'
import { findMaxObjKeyValue, padDomainMax, roundAxisZeros } from '../../helpers'
import CustomXaxisLabel from './CustomXaxisLabel'
import HistogramTooltip from './HistogramTooltip'
import CustomYaxisLabel from './CustomYaxisLabel'
import './@Histogram.css'

class ChartExperimentalHistogramStuff extends Component {


  getXScale (chartData, width) {
    return d3.scale.linear().domain([0, d3.max(chartData)]).range([0, width])
  }
  getYScale (chartData, height) {
    return d3.scale.linear().domain([0, d3.max(chartData, (d) => d.y)]).range([height, 0])
  }

  getNumberOfBins (freqs) {
    return d3.thresholdFreedmanDiaconis(freqs, Math.min.apply(null, freqs), Math.max.apply(null, freqs))
  }

  makeBarData (histogramData) {
    function findMean (data) {
      // first pop off the non-numeric keys.
      let min = data['x']
      let max = min + data['dx']
      return Math.round((max + min) / 2, 5)
    }
    let barData = histogramData.map(function (d, i) {
      let mean = findMean(d)
      return {'value': Math.round(mean, 5), 'frequency': Math.round(d.y, 0)}
    })
    return barData
  }


  render () {
    let {h, w, yAxisWidth, fillColor,  valTickFormater, xAxisHeight, colName, yTickCnt, xTickCnt, freqs} = this.props
    const noOfBins = 12
    let dx = 0
    let xScale = this.getXScale(freqs, w)
    let histogramDataFn = d3.layout.histogram().bins(xScale.ticks(noOfBins))
    let histogramData = histogramDataFn(freqs)
    //let dx = 0
    if (histogramData[0]) {
      dx = histogramData[0]['dx']
    }
    let barData = this.makeBarData(histogramData)
    let domainMaxX = Math.round(padDomainMax((findMaxObjKeyValue(barData, 'value'))* 1.10)  ,5)
    let domainMaxY = Math.round(padDomainMax(findMaxObjKeyValue(barData, 'frequency')), 5)
    let valueAxisTickLstY = roundAxisZeros(domainMaxY, 10, 10)
    let valueAxisTickLstX = roundAxisZeros(domainMaxX, 6, 10)
    valueAxisTickLstX =  valueAxisTickLstX.slice(1, valueAxisTickLstX.length)
    return (
      <Choose>
      <When condition={barData.length > 0}>
      <BarChart
        width={w}
        height={h}
        data={barData}
        barGap={0}
        margin={{ right: 10, left: 5 }}
        barCategoryGap={0} >
        <XAxis
          dataKey={'value'}
          type={'number'}
          //domain={[0, maxValueX]}
          height={xAxisHeight}
          tickCount={xTickCnt}
          ticks={valueAxisTickLstX}
          tickSize={3}
          domain={[0, (valueAxisTickLstX[valueAxisTickLstX.length-1]* 1.05)]}
          label={<CustomXaxisLabel val={'Value of ' + colName} isGroupBy={false} numOfGroups={0} />} />
        <YAxis
          type={'number'}
          width={yAxisWidth}
          label={<CustomYaxisLabel val={'Frequency of Values'} h={h} chartType={'histogram'} />}
          tickCount={yTickCnt}
          tickFormatter={valTickFormater}
          ticks={valueAxisTickLstY}
          tickSize={3}
          domain={[0, valueAxisTickLstY[valueAxisTickLstY.length-1]]} />
        <CartesianGrid  stroke='#eee' strokeDasharray='3 3' vertical={false} />
        <Tooltip content={<HistogramTooltip dx={dx} />} />
        <Bar dataKey='frequency' fill={fillColor} />
      </BarChart>
      </When>
      </Choose>
    )
  }
}

ChartExperimentalHistogramStuff.propTypes = {
  chartData: PropTypes.array,
  h: PropTypes.number,
  w: PropTypes.number
}

export default ChartExperimentalHistogramStuff
