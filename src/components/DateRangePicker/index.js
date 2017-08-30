import React from 'react'
import { OverlayTrigger, Popover, Form, Glyphicon } from 'react-bootstrap'
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker'
import moment from 'moment'
import './@DateRangePicker.css'
import 'react-day-picker/lib/style.css'

const DateInput = ({date, target, onChange, className}) => {
  return (
    <div className={'form-group ' + className}>
      <input type='text' className={'form-control'} value={date} onChange={onChange.bind(this, target)} onBlur={onChange.bind(this, target)} onKeyPress={onChange.bind(this, target)} />
      <Glyphicon glyph={'calendar'} />
    </div>)
}

const RangePicker = ({ranges, handleSelectRange, selectedRange}) => {
  let list = Object.keys(ranges).map((range, idx) => {
    let classNames = 'DateRangePicker__list-item' + (range === selectedRange ? ' DateRangePicker__list-item--active' : '')
    return (<li role='button' aria-pressed={false} className={classNames} onClick={handleSelectRange.bind(this, range)} key={'rangePicker_'+idx}>{range}</li>)
  })
//list.push(<li role='button' aria-pressed={false} className={'DateRangePicker__list-item'} key={'rangePicker_custom'}>Custom Range</li>)
  return (<ul className={'DateRangePicker__list list-unstyled'}>{list}</ul>)
}

const YearMonthForm = ({ date, localeUtils, onChange, dataRange, firstMonth }) => {
  const months = LocaleUtils.getMonths()
  const firstMonthPicker = date.setHours(12) === firstMonth.setHours(12)
  const beginningOfRange = moment(date).subtract(1,'month').toDate().setHours(12) === moment(dataRange[0]).toDate().setHours(12)
  const years = []
  for (let i = moment(dataRange[0]).toDate().getFullYear(); i <= moment(dataRange[1]).toDate().getFullYear(); i += 1) {
    years.push(i)
  }

  const handleChange = (e) => {
    const { year, month } = e.target.form
    let newDate = new Date(year.value, month.value)
    if (!firstMonthPicker && !beginningOfRange) {
      newDate = moment(newDate).subtract(1, 'month').toDate()
    }
    onChange(newDate)
  }

  return (
    <form id='' className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => <option key={i} value={i}>{month}</option>)}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map((year, i) =>
          <option key={i} value={year}>
            {year}
          </option>
        )}
      </select>
    </form>
  )
}

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCustom: false,
      selectedRange: null,
      from: moment(this.props.startDate).toDate(),
      to: moment(this.props.endDate).toDate(),
      month: moment(this.props.startDate).toDate(),
      fromInput: null,
      toInput: null
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
  }

  handleYearMonthChange = month => {
    this.setState({ month })
  }

  handleInput = (target, ev) => {
    let { from, to, toInput } = this.state
    let value = ev.target.value
    if (ev.type === 'change') {
      this.setState({
        [target]: value
      })
    } else if ((ev.type === 'keypress' && ev.key === 'Enter') || ev.type === 'blur') {
      let dateObject = moment(value)
      if(dateObject.isValid()) {
        let dateTarget = target.split('Input')[0]
        let range = []
        if (dateTarget === 'to') {
          range = [from, dateObject.toDate()]
          range = range[1].getTime() < range[0].getTime() ? [range[1],range[1]] : range
        } else if (dateTarget === 'from') {
          range = [dateObject.toDate(), to ? to : moment(toInput).toDate()]
          range = range[0].getTime() > range[1].getTime() ? [range[0],range[0]] : range
        }

        this.setState({
          fromInput: moment(range[0]).format('MM/DD/YYYY'),
          toInput: moment(range[1]).format('MM/DD/YYYY'),
          month: moment(range[0]).toDate(),
          from: moment(range[0]).toDate(),
          to: range[0].getTime() !== range[1].getTime() ? moment(range[1]).toDate() : null
        })
        if (range[0].getTime() !== range[1].getTime()) {
          this.handleSelectRange([moment(range[0]), moment(range[1])])
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    let start = moment(nextProps.startDate).toDate()
    let end = moment(nextProps.endDate).toDate()
    if (this.props.from !== start || this.props.to !== end) {
      this.setState({
        from: start,
        to: end,
        fromInput: null,
        toInput: null,
        month: start
      })
    }
  }

  render () {
    const { children, ranges, opens, dataRange } = this.props
    const { selectedRange, from, to, fromInput, toInput } = this.state
    let fromFormatted = fromInput !== null ? fromInput : moment(from).format('MM/DD/YYYY')
    let toFormatted = toInput !== null ? toInput : (to ? moment(to).format('MM/DD/YYYY') : moment(from).format('MM/DD/YYYY'))
  return (
    <OverlayTrigger
      trigger='click'
      placement={opens}
      rootClose
      overlay={
        <Popover id='DateRangePicker__root' className={'DateRangePicker__root'} title='Pick Date Range'>
          <div className={'DateRangePicker__calendar-wrapper'}>
            <DayPicker
              month={this.state.month}
              fromMonth={moment(dataRange[0]).toDate()}
              toMonth={moment(dataRange[1]).toDate()}
              numberOfMonths={2}
              selectedDays={[from, { from, to }]}
              onDayClick={this.handleDayClick}
              fixedWeeks
              captionElement={
              <YearMonthForm onChange={this.handleYearMonthChange} dataRange={dataRange} firstMonth={this.state.month} />
              }
            />
            <Form inline>
              <DateInput date={fromFormatted} target='fromInput' onChange={this.handleInput} className={'DateRangePicker__date-text-input-group'}/>
              <DateInput date={toFormatted} target='toInput' onChange={this.handleInput} className={'DateRangePicker__date-text-input-group'}/>
            </Form>
          </div>
          <RangePicker ranges={ranges} selectedRange={selectedRange} handleSelectRange={this.handleSelectRange} />
        </Popover>
        } >
      {children}
    </OverlayTrigger>
  )
  }
  
}

export default DateRangePicker