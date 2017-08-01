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
    let { nextRange, format, fieldKey } = this.props
    let options = {}
    let value = ev.target.value
    if (value !== '-') {
      value = value === '' ? null : parseInt(value, 10)
      if (format === 'percent' && value !== null) value = value / 100
    }
    if (value === null || value === '-' || (!isNaN(parseFloat(value)) && isFinite(value))) {
      nextRange = minOrMax === 'min' ? [value, nextRange[1]] : [nextRange[0], value]
      options.nextRange = nextRange
      options.filterType = 'numericRange'
      this.props.updateFilter(fieldKey, options)
    }
  }

  updateInputRange (value) {
    let { format } = this.props
    let options = {}
    if (format === 'percent') {
      value = [value[0] / 100, value[1] / 100]
    }
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
    let {nextRange, min, max, format} = this.props
    let style = {
      marginBottom: 15
    }
    let range = [].concat(nextRange)
    let sliderRange = [].concat(nextRange)
    let applyOrCancel
    if (!isEqual(this.props.currentRange, this.props.nextRange)) {
      applyOrCancel = (<div style={{textAlign: 'right', marginTop: '8px'}}><Button bsStyle='warning' bsSize='xs' onClick={this.cancelUpdate}>Cancel</Button> <Button bsStyle='success' bsSize='xs' onClick={this.applyUpdate}>Apply</Button></div>)
    }

    if (nextRange[0] === null) {
      range[0] = ''
      sliderRange[0] = 0
    }
    
    if (nextRange[1] === null) {
      range[1] = ''
      sliderRange[1] = 0
    }

    if (nextRange[0] === '-') {
      sliderRange[0] = 0
    }

    if (nextRange[1] === '-') {
      sliderRange[1] = 0
    }

    if (format === 'percent') {
      sliderRange = [parseInt(sliderRange[0] * 100, 10), parseInt(sliderRange[1] * 100, 10)]
      range[0] = range[0] === '' ? range[0] : parseInt(range[0] * 100, 10)
      range[1] = range[1] === '' ? range[1] : parseInt(range[1] * 100, 10)
      min = min * 100
      max = max * 100
    }

    return (
      <div>
        <div className='input-group input-group-sm' style={style}>
          <input type='text' className='form-control' value={range[0]} onChange={this.updateSliderRange.bind(this, 'min')} />
          <span className='input-group-addon'>to</span>
          <input type='text' className='form-control' value={range[1]} onChange={this.updateSliderRange.bind(this, 'max')} />
        </div>
        <Slider range
          min={min}
          max={max}
          allowCross={false}
          defaultValue={[min, max]}
          value={sliderRange}
          onChange={this.updateInputRange}
          style={style} />
        {applyOrCancel}
      </div>
    )
  }
}

export default FilterNumeric
