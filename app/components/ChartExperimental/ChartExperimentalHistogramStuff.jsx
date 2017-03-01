import React, { Component } from 'react'
import d3 from 'd3'
import { XAxis, BarChart, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts'
import { findMaxObjKeyValue, fillArray } from '../../helpers'
import CustomXaxisLabel from './CustomXaxisLabel'
import HistogramTooltip from './HistogramTooltip'
import CustomYaxisLabel from './CustomYaxisLabel'
require('./_Histogram.scss')

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
    let {h, w, margin, rowLabel, fillColor, chartData, yTickCnt, xTickCnt, valTickFormater, xAxisHeight, colName} = this.props
    let freqs = this.explodeFrequencies(chartData)
    let xScale = this.getXScale(freqs, w)
    let histogramDataFn = d3.layout.histogram().bins(xScale.ticks(15))
    let histogramData = histogramDataFn(freqs)
    let dx = 0
    if (histogramData[0]) {
      dx = histogramData[0]['dx']
    }
    let barData = this.makeBarData(histogramData)
    let maxValue = findMaxObjKeyValue(barData, 'frequency')
    let domainMax = maxValue + (maxValue * 0.03)
    const zerosDivStyle = {
      width: w,
      height: h
    }
    const innnerZerosDivStyle = {
      width: w,
      margin: '15% 5% 5% 5%',
      padding: '10px',
      position: 'relative',
      color: fillColor
    }
    const zeroMsg = {
      fontSize: '75%'
    }

    return (
      <Choose>
        <When condition={dx === 0}>
          <div className='zeros' style={zerosDivStyle}>
            <div style={innnerZerosDivStyle}>
              <p>No Chart to Display</p>
              <p style={zeroMsg}> Column Only Contains 0 Values </p>
            </div>
          </div>
        </When>
        <Otherwise>
          <BarChart
            width={w}
            height={h}
            data={barData}
            margin={margin}
            barGap={0}
            barCategoryGap={0} >
            <XAxis
              dataKey='value'
              type='number'
              height={xAxisHeight}
              domain={[0, domainMax]}
              tickCount={xTickCnt}
              label={<CustomXaxisLabel val={'Value of ' + colName} isGroupBy={false} numOfGroups={0} />} />
            <YAxis
              type='number'
              label={<CustomYaxisLabel val={'Frequency of Values'} h={h} />}
              tickCount={yTickCnt}
              tickFormatter={valTickFormater}
              domain={[0, domainMax]} />
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <Tooltip content={<HistogramTooltip dx={dx} />} />
            <Bar dataKey='frequency' fill={fillColor} />
          </BarChart>
        </Otherwise>
      </Choose>
    )
  }
}

ChartExperimentalHistogramStuff.propTypes = {
  chartData: React.PropTypes.array,
  h: React.PropTypes.number,
  w: React.PropTypes.number
}

export default ChartExperimentalHistogramStuff
