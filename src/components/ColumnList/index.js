import React, { PropTypes } from 'react'
import { Row, Col, Label, Panel } from 'react-bootstrap'

const labelStyle = {
  marginRight: '5px'
}

const humanType = {
  'text': 'Text',
  'category': 'Category',
  'boolean': 'Boolean',
  'date': 'Date/Time',
  'location': 'Latitude and Longitude',
  'number': 'Number'
}

const ColumnCard = ({item}) => (
  <Col md={12}>
    <Panel header={<h2>{item.name}</h2>} className={'descriptionPanel'}>
      <p> {item.description}</p>
      <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>Field type: {humanType[item.type]} </Label>
      <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>API name: {item.key}</Label>
    </Panel>
  </Col>
)

const sortColumns = (keys, list, sort) => {
  keys.sort(function (a, b) {
    let typeA = list[a][sort].toUpperCase()
    let typeB = list[b][sort].toUpperCase()

    if (typeA < typeB) {
      return -1
    }

    if (typeA > typeB) {
      return 1
    }

    return 0
  })

  return keys
}

const ColumnList = ({list, filters, sort}) => {
  filters = filters || []
  sort = sort || 'name'
  let keys = sortColumns(Object.keys(list), list, sort)

  let listItems = keys.map((key, idx) => {
    if (filters.length > 0 && filters.indexOf(list[key].type) === -1) {
      return false
    }
    return <ColumnCard item={list[key]} key={key} />
  })

  return (
    <Row className={'descriptionPanelHead'}>
      {listItems}
    </Row>
  )
}

ColumnList.propTypes = {
  list: PropTypes.object.isRequired,
  filter: PropTypes.array
}

export default ColumnList
