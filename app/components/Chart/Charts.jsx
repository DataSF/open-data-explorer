import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import ChartCanvas from './ChartCanvas'
import ChartSideBar from './ChartSideBar.jsx'
import './_Chart.scss'


class Charts extends Component {
  constructor (props) {
    super(props)
    //this.renderChartArea = this.renderChartArea.bind(this)
    //this.chartTypeChecks = this.chartTypeChecks.bind(this)
  }

  //shouldComponentUpdate (nextProps, nextState) {
  // return !nextProps.dataset.query.isFetching
  //}

  chartTypeChecks (otherProps, query, columns) {
    let chartDisplay = { displayChartOptions: false, chartType: null }
    if (otherProps.selectedColumnDef && otherProps.selectedColumnDef.type === 'date') {
      chartDisplay.chartType = 'area'
      chartDisplay.displayChartOptions = true
    }
    else{
        chartDisplay.chartType = 'bar'
    }
    let checkChartType = query.chartType
    if(checkChartType &&  chartDisplay.displayChartOptions) {
      chartDisplay.chartType = checkChartType
    }
    else {
      chartDisplay.chartType = 'bar'
    }
    return chartDisplay
  }

  renderChartArea (props) {
    let { dataset, handleGroupBy, handleSumBy, handleAddFilter, handleRemoveFilter, applyFilter, updateFilter, changeDateBy, applyChartType, selectColumn} = this.props
    let { columns, query, ...other } = dataset
    let otherProps = {...other}
    let selectedColumn = null
    let displayChartOptions = null
    if(query.selectedColumn){
      selectedColumn = query.selectedColumn
    }
    otherProps.selectedColumnDef = query.selectedColumn ? columns[query.selectedColumn] : null
    let chartDisplay = this.chartTypeChecks(otherProps, query, columns)
    displayChartOptions = chartDisplay.displayChartOptions
    console.log(displayChartOptions);
    let chartType = chartDisplay.chartType
    return (
      <Row>
          <ChartCanvas
            query={query}
            data={query.data}
            dateBy={query.dateBy}
            changeDateBy={changeDateBy}
            groupBy={query.groupBy}
            sumBy={query.sumBy}
            filters={query.filters}
            columns={columns}
            chartType={chartType}
            applyChartType={applyChartType}
            displayChartOptions={displayChartOptions}
            {...otherProps} />
           <ChartSideBar
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
            dataset= {dataset}
            selectColumn={selectColumn}
            displayChartOptions = {displayChartOptions}
          />
      </Row>
    )
  }

  render () {
    let ChartArea = this.renderChartArea(this.props)
    console.log("rendering the chart area")
    return (
      <div className={'container-fluid'}>
        <Col md={12}>
          {ChartArea}
        </Col>
      </div>

    )
  }
}

export default Charts
