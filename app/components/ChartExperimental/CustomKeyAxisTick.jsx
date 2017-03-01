import React, { Component } from 'react'
class CustomKeyAxisTick extends Component {

  render () {
    const {x, y, payload} = this.props
    console.log('in here')
    console.log(payload)
    let find = '[.*-:&!@#$%^&*()+-]'
    let re = new RegExp(find, 'g')
    let payLoadVal = payload.value.replace(re, '')
    payLoadVal = payLoadVal.substring(0, 5)
    console.log(payLoadVal)
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={2}
          textAnchor='end'
          fill='#666'>
          {payLoadVal}
        </text>
      </g>
    )
  }
}
export default CustomKeyAxisTick
