import React, { Component } from 'react'

class CustomKeyAxisTick extends Component {

  getTextSubstring (payload) {
    payload = payload.value.replace('.', '')
    payload = payload.replace('-', '')
    payload = payload.replace(',', '')
    payload = payload.slice(0, 7)
    return payload
  }

  render () {
    const {x, y, payload, isDtCol} = this.props
    let payloadVal
    if (isDtCol) {
      payloadVal = payload.value
    } else {
      payloadVal = this.getTextSubstring(payload)
    }
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={2}
          style={{fontSize: 12}}
          textAnchor='end'
          fill='#666'>
          {payloadVal}
        </text>
      </g>
    )
  }
}
export default CustomKeyAxisTick
