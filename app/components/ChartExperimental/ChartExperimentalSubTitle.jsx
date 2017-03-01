import React, { Component } from 'react'
import _ from 'lodash'
import titleize from 'titleize'
import moment from 'moment'

class ChartExperimentalSubTitle extends Component {
  constructor (props) {
    super(props)

    this.filterCategories = this.filterCategories.bind(this)
    this.filterDates = this.filterDates.bind(this)
    this.filterNumbers = this.filterNumbers.bind(this)
  }

  filterCategories (columnFilter, columnFilterName) {
    let subtitle = ''
    let fitlerCategory
    let { columns } = this.props

    if (typeof columnFilter.options['selected'] === 'string') {
      subtitle += titleize(columnFilter.options['selected'].toLowerCase())
    } else {
      subtitle = columnFilter.options['selected'].map(function (item) {
        return columnFilter.options.filterType === 'category' ? titleize(item) : titleize(columns[item].name)
      }).join(', ')
    }
    if (subtitle.length > 0) {
      fitlerCategory = 'Only Showing ' + subtitle
      subtitle = 'Filtering by ' + titleize(columnFilterName)
      subtitle = subtitle + ': ' + fitlerCategory
    }
    return <div key={columnFilterName}>{subtitle}</div>
  }

  filterDates (columnFilter, columnFilterName) {
    let subtitle = ''
    let fitlerCategory
    let minDt = moment(columnFilter.options.min).format('MM/DD/YYYY')
    let maxDt = moment(columnFilter.options.max).format('MM/DD/YYYY')
    subtitle = 'Filtering by ' + titleize(columnFilterName)
    fitlerCategory = 'Only Showing Records Between ' + minDt + ' and ' + maxDt
    subtitle = subtitle + ': ' + fitlerCategory
    return <div key={columnFilterName}>{subtitle}</div>
  }

  filterNumbers (columnFilter, columnFilterName) {
    let subtitle = ''
    let fitlerCategory
    let numList = columnFilter.options.nextRange
    let start = numList[0]
    let end = numList[1]
    subtitle = 'Filtering by ' + titleize(columnFilterName)
    fitlerCategory = 'Only Showing Records with Values Between ' + start + ' and ' + end
    subtitle = subtitle + ': ' + fitlerCategory
    return <div key={columnFilterName}>{subtitle}</div>
  }

  buildSubTitle (filters, columns) {
    const builders = {
      'category': this.filterCategories,
      'booleanCategory': this.filterCategories,
      'numericRange': this.filterNumbers,
      'dateRange': this.filterDates
    }

    let subtitle = []
    let newArray
    if (!_.isEmpty(filters)) {
      let filterKeys = Object.keys(filters)
      newArray = filterKeys.map(function (key) {
        let filter = filters[key]
        let column = columns[key] || null
        let columnName = column !== null ? column.name : 'Boolean Fields'
        if (!_.isEmpty(filter)) {
          return builders[filter.options.filterType](filter, columnName)
        }
        return null
      })
      /*
      for (let i = 0; i < filterKeys.length; i++) {
        let filter = filters[filterKeys[i]]
        let column = columns[filterKeys[i]] || null
        if (!_.isEmpty(filter)) {
          if (filter.options.filterType === 'category' && filter.options.selected !== null) {
            subtitle = subtitle.concat([this.filterCategories(filter, column.name), <br />])
          } else if (filter.options.filterType === 'booleanCategory') {
            subtitle = subtitle.concat([this.filterCategories(filter, 'Boolean Fields'), <br key='filterBoolBR' />])
          } else if (filter.options.filterType === 'dateRange') {
            subtitle = subtitle.concat([this.filterDates(filter, column.name), <br key='filterDateBR' />])
          } else if (filter.options.filterType === 'numericRange') {
            subtitle = subtitle.concat([this.filterNumbers(filters[filterKeys[i]], column.name), <br key='filterNumBR' />])
          }
        }
      } */
    }
    return newArray
  }
  render () {
    console.log(this.props)
    let {filters, columns} = this.props
    let subtitleStuff = this.buildSubTitle(filters, columns)
    return (
      <div className={'ChartSubTitle'}>{subtitleStuff}</div>
    )
  }
}

ChartExperimentalSubTitle.propTypes = {
  columns: React.PropTypes.object,
  filters: React.PropTypes.object
}

export default ChartExperimentalSubTitle
