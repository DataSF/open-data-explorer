import React, { Component } from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'
import { XAxis, BarChart, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts'
import { findMaxObjKeyValue, fillArray } from '../../helpers'
import CustomXaxisLabel from './CustomXaxisLabel'
import HistogramTooltip from './HistogramTooltip'
import CustomYaxisLabel from './CustomYaxisLabel'
import './@Histogram.css'

class ChartExperimentalHistogramStuff extends Component {
  explodeFrequencies (chartData) {
    let freqs = []
    chartData.forEach(function (el) {
      // function fillArray (value, len, arr)
      freqs = fillArray(Number(el.key), Number(el.value), freqs)
    })
    return freqs
  }

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
      return (max + min) / 2
    }
    let barData = histogramData.map(function (d, i) {
      let mean = findMean(d)
      return {'value': mean, 'frequency': d.y}
    })
    return barData
  }

  render () {
    let {h, w, yAxisWidth, fillColor, chartData, yTickCnt, valTickFormater, xAxisHeight, colName} = this.props
    let freqs = this.explodeFrequencies(chartData)
    let xScale = this.getXScale(freqs, w)
    let histogramDataFn = d3.layout.histogram().bins(xScale.ticks(15))
    let histogramData = histogramDataFn(freqs)
    let dx = 0
    if (histogramData[0]) {
      dx = histogramData[0]['dx']
    }
    let barData = this.makeBarData(histogramData)
    let maxValueX = findMaxObjKeyValue(barData, 'value') * 1.10
    let domainMaxY = findMaxObjKeyValue(barData, 'frequency') * 1.03

    return (
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
          domain={[0, maxValueX]}
          height={xAxisHeight}
          label={<CustomXaxisLabel val={'Value of ' + colName} isGroupBy={false} numOfGroups={0} />} />
        <YAxis
          type={'number'}
          width={yAxisWidth}
          label={<CustomYaxisLabel val={'Frequency of Values'} h={h} chartType={'histogram'} />}
          tickCount={yTickCnt}
          tickFormatter={valTickFormater}
          domain={[0, domainMaxY]} />
        <CartesianGrid  stroke='#eee' strokeDasharray='3 3' vertical={false} />
        <Tooltip content={<HistogramTooltip dx={dx} />} />
        <Bar dataKey='frequency' fill={fillColor} />
      </BarChart>
    )
  }
}

ChartExperimentalHistogramStuff.propTypes = {
  chartData: PropTypes.array,
  h: PropTypes.number,
  w: PropTypes.number
}

export default ChartExperimentalHistogramStuff
