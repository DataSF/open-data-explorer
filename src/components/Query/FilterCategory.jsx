import React, { Component } from 'react'
import Select from 'react-select'
import './@Query.css'

class FilterCategory extends Component {
  constructor (props) {
    super(props)

    this.onFilter = this.onFilter.bind(this)
  }

  onFilter (value) {
    value = value || []
    let { filter, applyFilter } = this.props
    let options = Object.assign({}, filter.options)
    let selected = filter.options ? filter.options.selected : null
    options.filterType = 'category'
    if (typeof value.multi !== 'undefined') {
      options.multi = value.multi
      if (Array.isArray(selected) && !value.multi) {
        options.selected = selected[0]
      }
    } else {
      options.selected = value.length > 0 ? value.map(function (option) {
        return option.value
      }) : (!Array.isArray(value) ? value.value : null)
    }

    applyFilter(this.props.fieldKey, options)
  }

  render () {
    let {options, filter} = this.props
    let multi = filter.options ? filter.options.multi : false
    let selected = filter.options ? filter.options.selected : null

    return (
      <div className='category-filter'>
        <Select
          name='category_2'
          placeholder='Select a category'
          options={options}
          value={selected}
          multi={true}
          onChange={this.onFilter}
          />
      </div>
    )
  }
}

export default FilterCategory
