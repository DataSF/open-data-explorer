import React, { Component } from 'react'
import Select from 'react-select'
import './@Query.css'

class FilterBoolean extends Component {
  constructor (props) {
    super(props)

    this.onFilter = this.onFilter.bind(this)
  }

  onFilter (value) {
    value = value || []
    let options = {}
    let { applyFilter } = this.props
    let selected

    if (value.filterJoin) {
      options = {
        join: value.filterJoin
      }
    } else {
      selected = value.length > 0 ? value.map((option) => {
        return option.value
      }) : null
      options = {
        selected: selected,
        filterType: 'booleanCategory'
      }
    }
    applyFilter(this.props.fieldKey, options)
  }

  render () {
    let {options, fieldKey, filter} = this.props
    let selected = filter.options ? filter.options.selected : null
    return (
      <div className='checkbox-filter'>
        <label className='radio-inline'>
          <input
            type='radio'
            value='or'
            name={fieldKey + '_join'}
            defaultChecked
            onClick={this.onFilter.bind(this, {filterJoin: 'or'})}
          /> Any
        </label>
        <label className='radio-inline'>
          <input
            type='radio'
            value='and'
            name={fieldKey + '_join'}
            onClick={this.onFilter.bind(this, {filterJoin: 'and'})}
          /> All
        </label>
        <Select
          name='category_3'
          placeholder='Select a category'
          options={options}
          multi
          value={selected}
          onChange={this.onFilter} />
      </div>
    )
  }
}

export default FilterBoolean
