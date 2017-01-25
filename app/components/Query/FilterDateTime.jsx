import './_daterangepicker.scss'
import React, { Component } from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import './_Query.scss'

const ranges = {
  'year': {
    'Last 3 Years': [moment().subtract(3, 'years').startOf('year'), moment()],
    'Last 5 Years': [moment().subtract(5, 'years').startOf('year'), moment()],
    'Last 10 Years': [moment().subtract(10, 'years').startOf('year'), moment()],
    'Last 90 days': [moment().subtract(89, 'days'), moment()],
    'Last 180 days': [moment().subtract(179, 'days'), moment()],
    'This Quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
    'Last Quarter': [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
    'This Year': [moment().startOf('year'), moment()],
    'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
  },
  'month': {
    'Last 90 days': [moment().subtract(89, 'days'), moment()],
    'Last 180 days': [moment().subtract(179, 'days'), moment()],
    'This Quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
    'Last Quarter': [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
    'This Year': [moment().startOf('year'), moment()],
    'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
  },
  'day': {
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'Last 90 days': [moment().subtract(89, 'days'), moment()],
    'Last 180 days': [moment().subtract(179, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
}

class FilterDateTime extends Component {
  constructor (props) {
    super(props)

    this.onFilter = this.onFilter.bind(this)
  }

  onFilter (ev, picker) {
    if (picker.oldStartDate.format('YYYY-MM-DD') !== picker.startDate.format('YYYY-MM-DD') || picker.oldEndDate.format('YYYY-MM-DD') !== picker.endDate.format('YYYY-MM-DD')) {
      let options = {
        min: picker.startDate,
        max: picker.endDate,
        filterType: 'dateRange'
      }
      this.props.applyFilter(this.props.fieldKey, options)
    }
  }

  render () {
    let start = moment(this.props.startDate).format('MM/DD/YYYY')
    let end = moment(this.props.endDate).format('MM/DD/YYYY')
    let label = start + ' to ' + end
    if (start === end) {
      label = start
    }

    return (
      <DateRangePicker startDate={moment(this.props.startDate)} endDate={moment(this.props.endDate)} ranges={ranges.year} onEvent={this.onFilter} opens='left'>
        <Button className='selected-date-range-btn' style={{width: '100%'}}>
          <div className='pull-left'><Glyphicon glyph='calendar' /></div>
          <div className='pull-right'>
            <span>
              {label}&nbsp;
            </span>
            <span className='caret' />
          </div>
        </Button>
      </DateRangePicker>
    )
  }
}

export default FilterDateTime
