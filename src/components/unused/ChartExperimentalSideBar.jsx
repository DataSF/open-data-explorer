import React, { Component } from 'react'
import ChartOptions from '../Query/ChartOptions'
import ChartType from './ChartType'
import ChartColumns from './ChartColumns'
import { Col, Accordion } from 'react-bootstrap'
import './_Chart.scss'

class ChartExperimentalSideBar extends Component {
  render () {
    let { chartType, displayChartOptions, selectedColumn, metadata, handleGroupBy, handleSumBy, handleAddFilter, handleRemoveFilter, applyFilter, updateFilter, applyChartType, selectColumn } = this.props
    let { columns, query } = metadata

    return (
      <Col md={3}>
        <Accordion>
          <ChartOptions
            {...query}
            columns={columns}
            handleGroupBy={handleGroupBy}
            handleAddFilter={handleAddFilter}
            handleRemoveFilter={handleRemoveFilter}
            applyFilter={applyFilter}
            updateFilter={updateFilter}
            handleSumBy={handleSumBy} />
          <ChartType applyChartType={applyChartType} displayChartOptions={displayChartOptions} chartType={chartType} />
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

ChartExperimentalSideBar.propTypes = {

  // chartData: React.PropTypes.array
}
export default ChartExperimentalSideBar
