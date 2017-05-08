require('fixed-data-table/dist/fixed-data-table.css')

import React, { Component } from 'react'
import {Pagination} from 'react-bootstrap'
import {Table, Column, Cell} from 'fixed-data-table'
import moment from 'moment'
import Dimensions from 'react-dimensions'
import d3 from 'd3'

var SortTypes = {
  ASC: 'asc',
  DESC: 'desc'
}

function reverseSortDirection (sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC
}

class SortHeaderCell extends Component {
  constructor (props) {
    super(props)

    this._onSortChange = this._onSortChange.bind(this)
  }

  render () {
    var {sortDir, children, ...props} = this.props

    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    )
  }

  _onSortChange (e) {
    e.preventDefault()

    if (this.props.onSortChange) {
      this.props.onSortChange(this.props.columnKey, this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC
      )
    }
  }
}

class DynamicCell extends Component {
  render () {
    const { rowIndex, field, data, format, ...props } = this.props
    let content
    if (format === 'location' && data[rowIndex][field]) {
      content = data[rowIndex][field].coordinates[1] + ', ' + data[rowIndex][field].coordinates[0]
    } else if (format === 'boolean') {
      content = data[rowIndex][field] ? 'Yes' : 'No'
    } else if (format === 'calendar_date' && data[rowIndex][field]) {
      content = moment(data[rowIndex][field]).format('MM/DD/YYYY')
    } else if (format === 'money' && data[rowIndex][field]) {
      let dollars = d3.format('$,')
      content = dollars(data[rowIndex][field])
    } else {
      content = data[rowIndex][field]
    }

    return (
      <Cell {...props}>
        {content}
      </Cell>
    )
  }
}

class DataTable extends Component {
  constructor (props) {
    super(props)

    this.handlePagination = this.handlePagination.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.metadata.id && !this.props.metadata.table) {
      this.props.loadTable()
    }
  }

  componentDidMount () {
    if (this.props.metadata.id && !this.props.metadata.table) {
      this.props.loadTable()
    }
  }

  handlePagination (page) {
    this.props.updatePage(page - 1)
  }

  render () {
    let { metadata, columns } = this.props
    let { table, rowCount } = metadata
    let tableContainer = null

    if (table && table.data && table.data.length > 0) {
      let perPage = 1000
      let tableRows = table.data.length
      let items = Math.ceil(parseInt(rowCount) / perPage)

      columns = Object.keys(columns).map((key, i) => {
        let column = columns[key]
        return <Column columnKey={key}
          key={key}
          header={
            <SortHeaderCell
              onSortChange={this.props.sortColumn}
              sortDir={columns[key].sortDir}>
              {column.name}
            </SortHeaderCell>
          }
          allowCellsRecycling
          cell={
            <DynamicCell
              data={table.data}
              field={key}
              format={column.format} />
          }
          width={200} />
      })

      tableContainer = (
        <div id='data-table'>
          <Table
            rowsCount={tableRows}
            rowHeight={50}
            headerHeight={50}
            width={this.props.containerWidth}
            height={500}>
            {columns}
          </Table>
          <Pagination
            bsSize='small'
            items={items}
            activePage={table.tablePage + 1}
            maxButtons={10}
            first
            last
            prev
            next
            ellipsis
            onSelect={this.handlePagination} />
        </div>
      )
    }

    return tableContainer
  }
}

export default Dimensions()(DataTable)
