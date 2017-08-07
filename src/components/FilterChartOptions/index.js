import './@FilterOptions.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Button, Panel } from 'react-bootstrap'
import FilterDateTime from './FilterDateTime'
import FilterCategory from './FilterCategory'
import FilterNumeric from './FilterNumeric'
import FilterBoolean from './FilterBoolean'

class FilterOptions extends Component {
  constructor (props) {
    super(props)

    this.renderFilterList = this.renderFilterList.bind(this)
  }

  renderFilterList () {
    let { filters, columns, handleRemoveFilter, applyFilter, updateFilter, dateBy } = this.props
    let filterOptions = Object.keys(filters).map((key) => {
      let filterContent = null
      let filterType
      let filter
      let checkboxOptions = {}
      if (key !== 'booleans') {
        filter = columns[key]
        filterType = (filter.type === 'text') && filter.categories ? 'category' : filter.type
      } else {
        filter = {key: 'booleans', name: 'True/False fields'}
        filterType = 'boolean'
        checkboxOptions = Object.keys(columns).filter((option) => {
          return columns[option].type === 'boolean'
        }).map((option) => {
          return {value: columns[option].key, label: columns[option].name}
        })
      }

      switch (filterType) {
        case 'date':
          let startDate = filters[key].options ? filters[key].options.min : filter.min
          let endDate = filters[key].options ? filters[key].options.max : filter.max
          filterContent = <FilterDateTime
            key={filter.key}
            fieldKey={filter.key}
            startDate={startDate}
            endDate={endDate}
            applyFilter={applyFilter}
            dateBy={dateBy} />
          break
        case 'category':
          let optionsForFilter = filter.categories.map(function (record) {
            if (!record.category) {
              return { label: 'Blank', value: 'blank' }
            }
            return { label: record.category, value: record.category }
          })
          filterContent = <FilterCategory
            key={filter.key}
            fieldKey={filter.key}
            options={optionsForFilter}
            applyFilter={applyFilter}
            filter={filters[key]} />
          break
        case 'boolean':
          filterContent = <FilterBoolean
            key={filter.key}
            fieldKey={filter.key}
            options={checkboxOptions}
            applyFilter={applyFilter}
            filter={filters[key]} />
          break
        case 'number':
          let nextRange = filters[key].options ? filters[key].options.nextRange : [parseInt(filter.min, 10), parseInt(filter.max, 10)]
          let currentRange = filters[key].options ? (filters[key].options.currentRange ? filters[key].options.currentRange : [parseInt(filter.min, 10), parseInt(filter.max, 10)]) : [parseInt(filter.min, 10), parseInt(filter.max, 10)]
          filterContent = <FilterNumeric
            key={filter.key}
            fieldKey={filter.key}
            min={parseInt(filter.min, 10)}
            max={parseInt(filter.max, 10)}
            currentRange={currentRange}
            nextRange={nextRange}
            filter={filters[key]}
            applyFilter={applyFilter}
            updateFilter={updateFilter}
            format={filter.format} />
          break
        default:
          return null
      }

      let filterOption = (
        <div className='filter' key={filter.key}>
          <div className='filter-content'>
            <Button className='close' onClick={handleRemoveFilter.bind(this, filter.key)}>
              &times;
            </Button>
            <h4>{filter.name}</h4>
            {filterContent}
          </div>
        </div>)

      return filterOption
    })
    return (<div className='FilterChartOptions__filter-options'>{filterOptions}</div>)
  }

  render () {
    let { handleAddFilter, options, filters } = this.props
    let booleans = false
    options = options.filter(field => {
      if (field.type === 'boolean') {
        booleans = true
        return false
      }
      return true
    })

    if (booleans) {
      options.push({value: 'booleans', label: 'True/False fields'})
    }

    return (
      <Panel className={'FilterChartOptions__root'} collapsible defaultExpanded header={<h4>Filter by other fields <span className='glyphicon collapse-icon' aria-hidden></span></h4>} bsStyle={'primary'}>
        <Select
          className={'FilterChartOptions__select'}
          name='filters'
          placeholder='Add fields to filter by'
          options={options}
          onChange={handleAddFilter} />
        {filters ? this.renderFilterList() : false}
      </Panel>
    )
  }
}

FilterOptions.propTypes = {
  filters: PropTypes.object,
  columns: PropTypes.object,
  handleRemoveFilter: PropTypes.func,
  applyFilter: PropTypes.func,
  updateFilter: PropTypes.func,
  handleAddFilter: PropTypes.func
}

export default FilterOptions
