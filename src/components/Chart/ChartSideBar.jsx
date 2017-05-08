import React, { Component } from 'react'
import ChartOptions from '../Query/ChartOptions'
import GroupOptions from '../Query/GroupOptions'
import ChartTypeOptions from './ChartTypeOptions'
import ChartColumns from './ChartColumns'
import ColumnSelector from '../Query/ColumnSelector'
import FilterOptions from '../Query/FilterOptions'
import { Col, Accordion } from 'react-bootstrap'
import './_Chart.scss'

class ChartSideBar extends Component {
  render () {
    let { chartType, displayChartOptions, selectedColumn, metadata, handleGroupBy, handleSumBy, handleAddFilter, handleRemoveFilter, applyFilter, updateFilter, applyChartType, selectColumn, filters } = this.props
    let { columns, query } = metadata
    let { groupableColumns, selectableColumns } = this.props.panelProps
    let { groupBy } = query

    return (
      <Col md={3}>
        <Accordion>
          <ColumnSelector
            columns={selectableColumns}
            selected={selectedColumn}
            onSelectColumn={selectColumn} />
          <GroupOptions
            columns={groupableColumns}
            selected={groupBy}
            onGroupBy={handleGroupBy} />
          <FilterOptions
            columns={columns}
            filters={filters}
            handleAddFilter={handleAddFilter}
            handleRemoveFilter={handleRemoveFilter}
            applyFilter={applyFilter}
            updateFilter={updateFilter}
            selectedColumn={columns[selectedColumn]}
            />
          <ChartOptions
            {...query}
            selectedColumn={selectedColumn}
            columns={columns}
            handleGroupBy={handleGroupBy}
            handleAddFilter={handleAddFilter}
            handleRemoveFilter={handleRemoveFilter}
            applyFilter={applyFilter}
            updateFilter={updateFilter}
            handleSumBy={handleSumBy} />
          <ChartTypeOptions
            applyChartType={applyChartType}
            displayChartOptions={displayChartOptions}
            chartType={chartType} />
          <ChartColumns
            metadata={metadata}
            selectColumn={selectColumn}
            columns={columns}
            selectedColumn={selectedColumn} />
        </Accordion>
      </Col>
    )
  }
}
export default ChartSideBar
