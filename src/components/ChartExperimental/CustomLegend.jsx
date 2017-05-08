import React, { Component } from 'react'

class CustomLegend extends Component {
  render () {
    let {payload} = this.props

    // console.log(payload)
    return (
      <div>
        <div>Legend</div>
        <ul>
          {
          payload.map((entry, index) => (
            <li key={`item-${index}`}>{entry.value}</li>
          ))
        }
        </ul>
      </div>
    )
  }
}

export default CustomLegend
