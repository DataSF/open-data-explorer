import React, { Component } from 'react'
import titleize from 'titleize'

class CustomXaxisLabel extends Component {
  render () {
    // review this, you can also pass in x, y, width
    let {val, viewBox, isGroupBy, numOfGrps} = this.props
    if (val.slice((val.length - 2), val.length) === 'ss') {
      val = val.slice(0, (val.length - 1))
    }
    val = titleize(val.toLowerCase())
    let xVal = (viewBox.width / 2)
    let yVal = 0
    if (isGroupBy) {
      if (numOfGrps < 13) {
        yVal = viewBox.height - 80
      } else if (numOfGrps > 13 && numOfGrps < 35) {
        yVal = viewBox.height - 105
      } else if (numOfGrps > 35 && numOfGrps < 44) {
        yVal = viewBox.height - 165
      } else {
        yVal = viewBox.height - 150
      }
    } else {
      yVal = viewBox.height - 65
    }
    return (
      <g className={'recharts-cartesian-axis-label'}>
        <text
          x={xVal}
          y={yVal}
          dy={16}
          style={{fontSize: 15}}
          textAnchor='middle'
          fill='#666'>
          {val}
        </text>
      </g>

    )
  }
}
export default CustomXaxisLabel
