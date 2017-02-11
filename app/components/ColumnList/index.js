import React, { PropTypes } from 'react'
import { Row, Col, Label, Panel } from 'react-bootstrap'

const labelStyle = {
  marginRight: '5px'
}

const humanType = {
  'text': 'Text',
  'category': 'Category',
  'checkbox': 'Boolean',
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

const ColumnList = ({list, filter, sort}) => {
  sort = sort || 'name'
  let keys = sortColumns(Object.keys(list), list, sort)

  filter = filter || ''

  let listItems = keys.map((key, idx) => {
    if (filter !== '' && list[key].type !== filter) {
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
  filter: PropTypes.string
}

export default ColumnList
