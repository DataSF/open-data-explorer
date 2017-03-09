import React, { Component } from 'react'
import './_ChartExperimental.scss'

class BlankChart extends Component {
  // Blank chart that gets intialized when user first hits chart page.
  render () {
    return (
      <div className='chartCanvasBlankCanvas'>
        Click on a dataset column to the right to start your charting adventure :-)
      </div>
    )
  }
}

export default BlankChart
