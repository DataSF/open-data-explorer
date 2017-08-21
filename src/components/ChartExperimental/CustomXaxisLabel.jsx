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
    let xVal = (viewBox.width / 2)+10
    let yVal = viewBox.height
    if (isGroupBy) {
      //console.log("grps")
      if (numOfGrps > 0 && numOfGrps <= 20) {
        yVal = yVal + 300
      }else if(numOfGrps > 20  && numOfGrps <= 25) {
        // console.log("**in here 20 to 25")
        yVal = yVal + 120
      }else if(numOfGrps > 25  && numOfGrps <= 40) {
        // console.log("**in here 20 to 30")
        yVal = yVal + 120
      } else if(numOfGrps > 40  && numOfGrps <= 50) {
        // console.log("**in here 40 to 50")
        yVal = yVal + 120
      } else if(numOfGrps > 50  && numOfGrps <= 60) {
        // console.log("**in here 40 to 50")
        yVal = yVal/2+ 150
      }
      else if(numOfGrps > 50  && numOfGrps < 100) {
        // console.log("**in here 50-100 plus")
        yVal = yVal/2+ 140
      }else{
        yVal = yVal/2+ 145
      }

    }else{
      yVal  = 443
      //yVal = viewBox.height - 65
    }
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
