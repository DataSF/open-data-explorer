import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import DayPicker, { DateUtils } from 'react-day-picker'
import moment from 'moment'
import './@DateRangePicker.css'
import 'react-day-picker/lib/style.css'

const RangePicker = ({ranges, handleSelectRange, selectedRange}) => {
  let list = Object.keys(ranges).map((range, idx) => {
    let classNames = 'DateRangePicker__list-item' + (range === selectedRange ? ' DateRangePicker__list-item--active' : '')
    return (<li role='button' aria-pressed={false} className={classNames} onClick={handleSelectRange.bind(this, range)} key={'rangePicker_'+idx}>{range}</li>)
  })
  list.push(<li role='button' aria-pressed={false} className={'DateRangePicker__list-item'} key={'rangePicker_custom'}>Custom Range</li>)
  return (<ul className={'DateRangePicker__list list-unstyled'}>{list}</ul>)
}

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCustom: false,
      selectedRange: null,
      from: moment(this.props.startDate).toDate(),
      to: moment(this.props.endDate).toDate()
    }
  }
  
  handleSelectRange = (range, ev) => {
    let rangeKey
    if (typeof range === 'string') {
      rangeKey = range
      range = this.props.ranges[rangeKey]
      this.setState({selectedRange: rangeKey})
    }

    let picker = {
      startDate: range[0],
      endDate: range[1],
      oldStartDate: this.props.startDate,
      oldEndDate: this.props.endDate
    }
    this.props.onEvent(ev, picker)
  }

  handleDayClick = day => {
    let {from, to} = this.state
    let range = null
    if (from && to) {
      range = {from: day, to: null, selectedRange: 'Custom'}
      this.setState(range)
    } else if (from && !to) {
      range = DateUtils.addDayToRange(day, this.state)
      this.handleSelectRange([moment(range.from), moment(range.to)])
    }
  };

  componentWillReceiveProps (nextProps) {
    let start = moment(nextProps.startDate).toDate()
    let end = moment(nextProps.endDate).toDate()
    if (this.props.from !== start || this.props.to !== end) {
      this.setState({
        from: start,
        to: end
      })
    }
  }

  render () {
    let { children, ranges, opens } = this.props
    let { selectedRange, from, to } = this.state

    console.log(from)
    console.log(to)
    
  return (
    <OverlayTrigger
      trigger='click'
      placement={opens}
      overlay={
        <Popover id='DateRangePicker__root' className={'DateRangePicker__root'} title='Pick Date Range'>
          <DayPicker
            numberOfMonths={2}
            selectedDays={[from, { from, to }]}
            onDayClick={this.handleDayClick}
            fixedWeeks
          />
          <RangePicker ranges={ranges} selectedRange={selectedRange} handleSelectRange={this.handleSelectRange} />
        </Popover>
        } >
      {children}
    </OverlayTrigger>
  )
  }
  
}

export default DateRangePicker