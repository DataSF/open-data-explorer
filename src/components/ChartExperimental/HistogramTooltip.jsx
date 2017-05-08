import React, { Component } from 'react'

class HistogramTooltip extends Component {
  buildHistogramLabel (label, dx) {
    let maxVal = Number(label) + Number(dx / 2)
    let minVal = label - Number(dx / 2)
    return 'Value Range of Bin:   ' + String(minVal) + ' to ' + String(maxVal)
  }

  render () {
    const {active} = this.props

    if (active) {
      const { payload, label, dx } = this.props
      return (
        <div className='custom-tooltip'>
          <p className='intro'>{`${this.buildHistogramLabel(label, dx)}`}</p>
          <p className='intro'>{ 'Frequency of Values :' + payload[0].value}</p>
        </div>
      )
    }
    return null
  }
}
HistogramTooltip.propTypes = {
  type: React.PropTypes.string,
  payload: React.PropTypes.array,
  label: React.PropTypes.number,
  dx: React.PropTypes.number
}

export default HistogramTooltip
