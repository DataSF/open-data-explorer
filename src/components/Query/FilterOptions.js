import './@Query.css'

import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { Well, Button, Panel } from 'react-bootstrap'
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
        filterType = (filter.type === 'text' || filter.type === 'number') && filter.categories ? 'category' : filter.type
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
          let nextRange = filters[key].options ? filters[key].options.nextRange : [parseInt(filter.min), parseInt(filter.max)]
          let currentRange = filters[key].options ? (filters[key].options.currentRange ? filters[key].options.currentRange : [parseInt(filter.min), parseInt(filter.max)]) : [parseInt(filter.min), parseInt(filter.max)]
          filterContent = <FilterNumeric
            key={filter.key}
            fieldKey={filter.key}
            min={parseInt(filter.min)}
            max={parseInt(filter.max)}
            currentRange={currentRange}
            nextRange={nextRange}
            filter={filters[key]}
            applyFilter={applyFilter}
            updateFilter={updateFilter} />
          break
      }

      let filterOption = (
        <Well bsSize='small' className='filter' key={filter.key}>
          <div className='filter-content'>
            <Button className='close' onClick={handleRemoveFilter.bind(this, filter.key)}>
              &times;
            </Button>
            <h4>{filter.name}</h4>
            {filterContent}
          </div>
        </Well>)

      return filterOption
    })
    return filterOptions
  }

  render () {
    let { handleAddFilter, columns, filters } = this.props
    let booleans = false
    // todo: these are specific to Socrata, filterable columns should just be set in the state when columns are processed
    const notFilters = ['boolean', 'location', 'url']

    let options = Object.keys(columns).filter((column) => {
      let option = columns[column]
      if (option.unique) return false
      if (option.type === 'boolean') booleans = true
      if (notFilters.indexOf(option.type) > -1) return false
      if (!option.categories && option.type === 'text') return false
      if (option.singleValue) return false
      return true
    }).map((column, i) => {
      let option = columns[column]
      return {
        value: option.key,
        label: option.name
      }
    })

    if (booleans) {
      options.push({value: 'booleans', label: 'True/False fields'})
    }

    return (
      <Panel collapsible defaultExpanded header='Filter chart by other columns' bsStyle={'primary'}>
        <Select
          name='filters'
          placeholder="Select fields you'd like to filter by"
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
