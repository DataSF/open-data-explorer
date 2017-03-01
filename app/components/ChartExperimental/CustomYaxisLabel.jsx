import React, { Component } from 'react'

class CustomYaxisLabel extends Component {
  render () {
    // review this, you can also pass in x, y, width
    const { h, val } = this.props
    let xVal = (0 - ((h / 2) - 55))
    return (
      <g>
        <text
          x={xVal}
          y={0 - 5.5}
          dy={16}
          textAnchor='middle'
          fill='#666'
          transform='rotate(-90)'>
          {val}
        </text>
      </g>
    )
  }
}
export default CustomYaxisLabel
