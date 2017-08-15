import React, { Component } from 'react'

class CustomYaxisLabel extends Component {
  render () {
    // review this, you can also pass in x, y, width
    let { h, val, chartType } = this.props
    if (val.slice((val.length - 2), val.length) === 'ss') {
      val = val.slice(0, (val.length - 1))
    }
    let xVal = (0 - ((h / 2) - 55))
    let y = 5.7
    let dy = 16
    if(chartType === 'line' || chartType === 'area' || chartType === 'histogram' ){
      dy=20
    }
    console.log("****value len***")
    console.log(val)

    return (
      <g>
        <text
          x={xVal}
          y={0 - y}
          dy={dy}
          textAnchor='middle'
          fill='#666'
          style={{fontSize: 13}}
          transform='rotate(-90)'>
          {val}
        </text>
      </g>
    )
  }
}
export default CustomYaxisLabel
