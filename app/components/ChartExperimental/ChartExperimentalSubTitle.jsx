import React, { Component } from 'react'
import _ from 'lodash'
import titleize from 'titleize'
import moment from 'moment'

class ChartExperimentalSubTitle extends Component {
  filterCategories (columnFilter, columnFilterName) {
    let subtitle = ''
    let fitlerCategory
    if (typeof columnFilter.options['selected'] === 'string') {
      subtitle += titleize(columnFilter.options['selected'].toLowerCase())
    } else {
      subtitle = columnFilter.options['selected'].map(function (item) {
        return titleize(item.toLowerCase())
      }).join(', ')
    }
    if (subtitle.length > 0) {
      fitlerCategory = 'Only Showing ' + subtitle
      subtitle = 'Filtering by ' + titleize(columnFilterName)
      subtitle = subtitle + ': ' + fitlerCategory
    }
    return <span key='filterCatText'>{subtitle}</span>
  }

  filterDates (columnFilter, columnFilterName) {
    let subtitle = ''
    let fitlerCategory
    let minDt = moment(columnFilter.options.min).format('MM/DD/YYYY')
    let maxDt = moment(columnFilter.options.max).format('MM/DD/YYYY')
    subtitle = 'Filtering by ' + titleize(columnFilterName)
    fitlerCategory = 'Only Showing Records Between ' + minDt + ' and ' + maxDt
    subtitle = subtitle + ': ' + fitlerCategory
    return <span key='filterDateText'>{subtitle}</span>
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
    return <span key='filterNumText'>{subtitle}</span>
  }

  buildSubTitle (filters, columns) {
    let subtitle = []
    if (!_.isEmpty(filters)) {
      let filterKeys = Object.keys(filters)
      for (let i = 0; i < filterKeys.length; i++) {
        let filter = filters[filterKeys[i]]
        let column = columns[filterKeys[i]]
        if (!_.isEmpty(filter)) {
          if (filter.options.filterType === 'category' && filter.options.selected !== null) {
            subtitle = subtitle.concat([this.filterCategories(filter, column.name), <br key='filterCatBR' />])
          } else if (filter.options.filterType === 'dateRange') {
            subtitle = subtitle.concat([this.filterDates(filter, column.name), <br key='filterDateBR' />])
          } else if (filter.options.filterType === 'numericRange') {
            subtitle = subtitle.concat([this.filterNumbers(filters[filterKeys[i]], column.name), <br key='filterNumBR' />])
          }
        }
      }
    }
    return subtitle
  }
  render () {
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
