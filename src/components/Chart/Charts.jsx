import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import ChartCanvas from './ChartCanvas'
import ChartSideBar from './ChartSideBar.jsx'
import './_Chart.scss'

class Charts extends Component {

  // shouldComponentUpdate (nextProps, nextState) {
  // return !nextProps.dataset.query.isFetching
  // }

  chartTypeChecks (selectedColumnDef, query, columns) {
    let chartDisplay = { displayChartOptions: false, chartType: null }
    if (selectedColumnDef && selectedColumnDef.type === 'date') {
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

  renderChartArea (props) {
    let { chartProps, panelProps } = this.props
    let { selectedColumnDef } = chartProps
    console.log(selectedColumnDef)
    // let { chartType } = chartProps
    let { metadata, handleGroupBy, handleSumBy, handleAddFilter, handleRemoveFilter, applyFilter, updateFilter, changeDateBy, applyChartType, selectColumn } = this.props
    let { columns, query, ...other } = metadata
    let otherProps = {...other}
    let displayChartOptions = null
    // otherProps.selectedColumnDef = selectedColumn ? columns[selectedColumn] : null
    let chartDisplay = this.chartTypeChecks(selectedColumnDef, query, columns)
    displayChartOptions = chartDisplay.displayChartOptions
    let chartType = chartDisplay.chartType
    return (
      <Row>
        <ChartCanvas
          {...chartProps}
          chartType={chartType}
          changeDateBy={changeDateBy}
          applyChartType={applyChartType}
          displayChartOptions={displayChartOptions}
          {...otherProps} />
        <ChartSideBar
          {...query}
          panelProps={panelProps}
          selectedColumn={chartProps.selectedColumn}
          columns={chartProps.columns}
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

  render () {
    console.log(this.props)
    let ChartArea = this.renderChartArea(this.props)
    return (
      <div>
        {ChartArea}
      </div>
    )
  }
}

export default Charts
