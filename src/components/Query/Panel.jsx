import React, { Component } from 'react'
import '../ChartExperimental/@Chart.css'
import ColumnSelector from './ColumnSelector'
import GroupOptions from './GroupOptions'
import FilterOptions from './FilterOptions'
import SumOptions from './SumOptions'
import ChartTypeOptions from '../Chart/ChartTypeOptions'
import { Accordion } from 'react-bootstrap'
import ConditionalOnSelect from '../ConditionalOnSelect'

class Panel extends Component {
  // /Panel component for holding filter functions.
  render () {
    let {selectedColumn, groupableColumns, groupBy, handleGroupBy, summableColumns, sumBy, handleSumBy, filters, columns, handleAddFilter, handleRemoveFilter, applyFilter, updateFilter, applyChartType, chartType, selectableColumns, selectColumn} = this.props
    return (
      <Accordion>
        <ConditionalOnSelect selectedColumn={selectedColumn}>
          <GroupOptions columns={groupableColumns} selected={groupBy} onGroupBy={handleGroupBy} />
          <SumOptions columns={summableColumns} selected={sumBy} onSumBy={handleSumBy} />
          <FilterOptions
            filters={filters}
            columns={columns}
            handleAddFilter={handleAddFilter}
            handleRemoveFilter={handleRemoveFilter}
            applyFilter={applyFilter}
            updateFilter={updateFilter} />
          <ChartTypeOptions applyChartType={applyChartType} chartType={chartType} />
        </ConditionalOnSelect>
        <ColumnSelector columns={selectableColumns} selected={selectedColumn} onSelectColumn={selectColumn} />
      </Accordion>
    )
  }
}
export default Panel
