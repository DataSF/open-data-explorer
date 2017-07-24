import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Slider from 'rc-slider'
import isEqual from 'lodash/isEqual'

class FilterNumeric extends Component {
  constructor (props) {
    super(props)

    this.updateSliderRange = this.updateSliderRange.bind(this)
    this.updateInputRange = this.updateInputRange.bind(this)
    this.applyUpdate = this.applyUpdate.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)
  }

  updateSliderRange (minOrMax, ev) {
    let { nextRange } = this.props
    let options = {}
    if (ev.target.value) {
      let value = parseInt(ev.target.value, 10)
      nextRange = minOrMax === 'min' ? [value, nextRange[1]] : [nextRange[0], value]
      options.nextRange = nextRange
      options.filterType = 'numericRange'
      this.props.updateFilter(this.props.fieldKey, options)
    }
  }

  updateInputRange (value) {
    let options = {}
    options.nextRange = value
    options.filterType = 'numericRange'
    this.props.updateFilter(this.props.fieldKey, options)
  }

  applyUpdate () {
    let options = {}
    options.currentRange = this.props.nextRange
    options.filterType = 'numericRange'
    this.props.applyFilter(this.props.fieldKey, options)
  }

  cancelUpdate () {
    let options = {}
    options.nextRange = this.props.currentRange
    options.filterType = 'numericRange'
    this.props.updateFilter(this.props.fieldKey, options)
  }

  render () {
    let {nextRange, min, max} = this.props
    let style = {
      marginBottom: 15
    }
    let applyOrCancel = null
    if (!isEqual(this.props.currentRange, this.props.nextRange)) {
      applyOrCancel = (<div style={{textAlign: 'right', marginTop: '8px'}}><Button bsStyle='warning' bsSize='xs' onClick={this.cancelUpdate}>Cancel</Button> <Button bsStyle='success' bsSize='xs' onClick={this.applyUpdate}>Apply</Button></div>)
    }
    return (
      <div>
        <div className='input-group input-group-sm' style={style}>
          <input type='text' className='form-control' value={nextRange[0]} onChange={this.updateSliderRange.bind(this, 'min')} />
          <span className='input-group-addon'>to</span>
          <input type='text' className='form-control' value={nextRange[1]} onChange={this.updateSliderRange.bind(this, 'max')} />
        </div>
        <Slider range
          min={min}
          max={max}
          allowCross={false}
          defaultValue={[min, max]}
          value={nextRange}
          onChange={this.updateInputRange}
          style={style} />
        {applyOrCancel}
      </div>
    )
  }
}

export default FilterNumeric
