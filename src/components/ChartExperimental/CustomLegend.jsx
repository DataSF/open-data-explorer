import React, { Component } from 'react'

class CustomLegend extends Component {
  render () {
    let {colName,  isGroupBy} = this.props
    let payLoad
    if(!isGroupBy){
      payLoad = [colName]
    }
    return (
      <div style={{paddingTop:'-200px'}}>
        <div>Legend</div>
        <ul>
          {
          payLoad.map((entry, index) => (
            <li key={`item-${index}`}>{entry}</li>
          ))
        }
        </ul>
      </div>
    )
  }
}

export default CustomLegend
