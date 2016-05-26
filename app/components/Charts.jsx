import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import ChartCanvas from './ChartCanvas'
import ChartOptions from './ChartOptions'

class Charts extends Component {
  constructor (props) {
    super(props)

    this.renderColumnButton = this.renderColumnButton.bind(this)
    this.renderChartArea = this.renderChartArea.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextProps.dataset.query.isFetching
  }

  renderColumnButton (column, idx, columns) {
    function removeIdKeys (obj) {
      // remove id fields from the buttons
      var removedIdKeys = []
      var idRegex = /id+/g
      for (var key in obj) {
        var isIdField = idRegex.test(key)
        if (isIdField) {
          removedIdKeys.push(key)
        }
      }
      return removedIdKeys
    }

    var removedIdKeys = removeIdKeys(columns)
    let col = columns[column]
    let { selectColumn } = this.props
    let categoryColumns = this.props.dataset.categoryColumns
    let colTypesAccepted = ['number', 'checkbox', 'date']
    if ((categoryColumns.indexOf(col.key) > -1 || colTypesAccepted.indexOf(col.type) > -1) && (removedIdKeys.indexOf(col.key) < 0)) {
      return (
        <Button
          key={idx}
          bsSize='small'
          bsStyle='primary'
          onClick={selectColumn.bind(this, col.key)}>
          {col.name}
        </Button>
      )
    } else {
      return null
    }
  }

  renderChartArea (props) {
    let { dataset, handleGroupBy, handleAddFilter, handleRemoveFilter, applyFilter, updateFilter, changeDateBy } = this.props
    let { columns, query, ...other } = dataset
    let otherProps = {...other}

    otherProps.selectedColumnDef = query.selectedColumn ? columns[query.selectedColumn] : null
    otherProps.chartType = 'bar'

    if (otherProps.selectedColumnDef && otherProps.selectedColumnDef.type === 'date') {
      otherProps.chartType = 'area'
    }
    return (
      query && query.data
      ? (<Row>
        <Col md={9}>
          <ChartCanvas data={query.data} dateBy={query.dateBy} changeDateBy={changeDateBy} {...otherProps} />
        </Col>
        <Col md={3}>
          <ChartOptions
            {...query}
            columns={columns}
            handleGroupBy={handleGroupBy}
            handleAddFilter={handleAddFilter}
            handleRemoveFilter={handleRemoveFilter}
            applyFilter={applyFilter}
            updateFilter={updateFilter} />
        </Col>
      </Row>)
      : false
    )
  }

  render () {
    let { columns } = this.props.dataset
    let cols = []
    if (columns) {
      cols = Object.keys(columns).map((column, idx) => {
        return this.renderColumnButton(column, idx, columns)
      })
    }
    return (
      <div>
        <Row>
          <Col md={12}>
            {cols}
          </Col>
        </Row>
        {this.renderChartArea()}
      </div>

    )
  }
}

export default Charts
