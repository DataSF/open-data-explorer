import React, { Component } from 'react'
import titleize from 'titleize'

class CustomXaxisLabel extends Component {
  render () {
    // review this, you can also pass in x, y, width
    let {val, viewBox, isGroupBy, numOfGrps, chartType} = this.props
    if (val.slice((val.length - 2), val.length) === 'ss') {
      val = val.slice(0, (val.length - 1))
    }
    console.log('***viewBox***')
    console.log(viewBox)
    console.log("numOfGrps")
    console.log(numOfGrps)
    val = titleize(val.toLowerCase())
    let xVal = (viewBox.width / 2)+5
    let yVal = viewBox.height
    if (isGroupBy) {
      console.log("grps")
      if (numOfGrps > 0 && numOfGrps <= 23) {
        if(chartType === 'line'){
          yVal = yVal/2+ 145
        }else{
          yVal = viewBox.height - 80
        }
      }else if(numOfGrps > 23  && numOfGrps < 50) {
        console.log("**in here 23 to 50")
        yVal = yVal/2+ 120
      }else if(numOfGrps > 50  && numOfGrps < 100) {
        console.log("**in here 50-100 plus")
        yVal = yVal/2+ 10
        console.log(yVal)
      }else{
        yVal = yVal/2+ 145
      }

    }else{
      if(chartType === 'line'){
        yVal = yVal - 65
        console.log("***not grp by***")
        console.log(yVal)
      }else{
         yVal = viewBox.height - 65
      }
    }
    console.log(yVal)
    return (
      <g className={'recharts-cartesian-axis-label'}>
        <text
          x={xVal}
          y={yVal}
          dy={1}
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
