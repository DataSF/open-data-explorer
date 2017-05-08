import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import Panel from './Panel'
import './@ChartExperimental.css'
import ChartExperimentalCanvas from './ChartExperimentalCanvas'

class ChartExperimental extends Component {

  chartTypeChecks (otherProps, query, columns) {
    let chartDisplay = { displayChartOptions: false, chartType: null }
    if (otherProps.selectedColumnDef && otherProps.selectedColumnDef.type === 'date') {
      chartDisplay.chartType = 'area'
      chartDisplay.displayChartOptions = true
    } else {
      chartDisplay.chartType = 'bar'
    }
    let checkChartType = query.chartType
    if (checkChartType && chartDisplay.displayChartOptions) {
      chartDisplay.chartType = checkChartType
    } else {
      chartDisplay.chartType = 'bar'
    }
    return chartDisplay
  }
  render () {
    let groupKeys
    let {chart, metadata, handleGroupBy, handleSumBy, handleAddFilter, handleRemoveFilter, applyFilter, updateFilter, changeDateBy, applyChartType, selectColumn, changeRollupBy} = this.props
    let {columns, query, ...other} = metadata
    groupKeys = query.groupKeys
    let chartData = this.props.chart.chartData
    let otherProps = {...other}
    let displayChartOptions = null
    otherProps.selectedColumnDef = query.selectedColumn ? columns[query.selectedColumn] : null
    let chartDisplay = this.chartTypeChecks(otherProps, query, columns)
    displayChartOptions = chartDisplay.displayChartOptions
    let chartType = chartDisplay.chartType
    return (
      <Row>
        <ChartExperimentalCanvas
          chart={chart}
          chartData={chartData}
          groupKeys={groupKeys}
          changeDateBy={changeDateBy}
          changeRollupBy={changeRollupBy}
          columns={columns}
          {...otherProps}
          query={query}
          dateBy={query.dateBy}
          rollupBy={query.rollupBy}
          groupBy={query.groupBy}
          sumBy={query.sumBy}
          filters={query.filters}
          chartType={chartType}
          applyChartType={applyChartType}
          displayChartOptions={displayChartOptions}
          />
        <Panel
          {...query}
          columns={columns}
          handleGroupBy={handleGroupBy}
          handleAddFilter={handleAddFilter}
          handleRemoveFilter={handleRemoveFilter}
          applyFilter={applyFilter}
          updateFilter={updateFilter}
          handleSumBy={handleSumBy}
          applyChartType={applyChartType}
          displayChartOptions={displayChartOptions}
          chartType={chartType}
          metadata={metadata}
          selectColumn={selectColumn} />
      </Row>
    )
  }
}

export default ChartExperimental

