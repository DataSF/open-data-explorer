import 'fixed-data-table/dist/fixed-data-table.css'
import './@DataTable.css'
import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'
import {Table, Column, Cell} from 'fixed-data-table'
import moment from 'moment'
import Dimensions from 'react-dimensions'
import { format as formatD3 } from 'd3'

var SortTypes = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: null
}

function switchDirection (sortDir) {
  switch (sortDir) {
    case SortTypes.ASC:
      return SortTypes.DESC
    case SortTypes.DESC:
      return SortTypes.NONE
    default:
      return SortTypes.ASC
  }
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
        <a className='Table__sort-link' onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↑' : '↓') : ''}
        </a>
      </Cell>
    )
  }

  _onSortChange (e) {
    e.preventDefault()

    if (this.props.onSortChange) {
      this.props.onSortChange(this.props.columnKey, switchDirection(this.props.sortDir))
    }
  }
}

class DynamicCell extends Component {
  render () {
    const { rowIndex, field, data, format, type, ...props } = this.props
    let content
    if (format === 'location' && data[rowIndex][field]) {
      content = data[rowIndex][field].coordinates[1] + ', ' + data[rowIndex][field].coordinates[0]
    } else if (format === 'boolean') {
      content = data[rowIndex][field] ? 'Yes' : 'No'
    } else if (format === 'calendar_date' && data[rowIndex][field]) {
      content = moment(data[rowIndex][field]).format('MM/DD/YYYY')
    } else if (format === 'money' && data[rowIndex][field]) {
      let dollars = formatD3('$,')
      content = dollars(data[rowIndex][field])
    } else if (type.indexOf('geometry') > -1 && format !== 'location') {
      // TODO: output wkt from geom
      content = ''
    } 
    else {
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

  handlePagination (page) {
    this.props.updatePage(page - 1)
  }

  render () {
    let { columns, rowCount, table } = this.props
    let tableContainer = null

    if (table && table.tableData && table.tableData.length > 0) {
      let perPage = 1000
      let tableRows = table.tableData.length
      let items = Math.ceil(parseInt(rowCount, 10) / perPage)

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
              data={table.tableData}
              field={key}
              format={column.format}
              type={column.type} />
          }
          width={200} />
      })

      tableContainer = (
        <div id='data-table'>
          <Table
            rowsCount={tableRows}
            rowHeight={50}
            headerHeight={50}
            width={this.props.containerWidth - 30}
            height={(this.props.viewportHeight - this.props.topOffset - 50)}>
            {columns}
          </Table>
          <div style={{textAlign: 'center'}}>
          <Pagination
            bsSize='medium'
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
        </div>
      )
    }

    return tableContainer
  }
}

export default Dimensions()(DataTable)
