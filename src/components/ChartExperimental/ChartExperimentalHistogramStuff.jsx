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
    let {h, w, yAxisWidth, fillColor, chartData, yTickCnt, valTickFormater, xAxisHeight, colName, valueAxisTickLst,dx,isFetching, isGroupBy } = this.props

    console.log("*** is group by**")
    console.log(isGroupBy)
    let maxValueX = findMaxObjKeyValue(chartData, 'value') * 1.10
    //let domainMaxY = findMaxObjKeyValue(barData, 'frequency') * 1.03

    return (
      <Choose>
      <When condition={chartData.length > 0}>
      <BarChart
        width={w}
        height={h}
        data={chartData}
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
          //domain={[0, domainMaxY]}
          ticks={valueAxisTickLst}
          domain={[0, valueAxisTickLst[valueAxisTickLst.length-1]]} />
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
