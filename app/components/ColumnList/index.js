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

const ColumnCard = ({item}) => {
  return (
    <Col md={12}>
      <Panel header={<h2>{item.name}</h2>} className={'descriptionPanel'}>
        <p> {item.description}</p>
        <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>Field type: {humanType[item.type]} </Label>
        <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>API name: {item.key}</Label>
      </Panel>
    </Col>
  )
}

/*
  function compareTypes (a, b) {
    let typeA = humanType[list[a].type].toUpperCase()
    let typeB = humanType[list[b].type].toUpperCase()

    if (typeA < typeB) {
      return -1
    }

    if (typeA > typeB) {
      return 1
    }

    return 0
  }
 */

const ColumnList = ({list}) => {
  let keys = Object.keys(list)
  // for sorting by type, compare function will be based on above and passed based on sort set in state, which doesn't exist yet
  keys.sort()

  let listItems = keys.map((key, idx) => {
    return <ColumnCard item={list[key]} key={key} />
  })

  return (
    <Row className={'descriptionPanelHead'}>
      {listItems}
    </Row>
  )
}

ColumnList.propTypes = {
  list: PropTypes.object.isRequired
}

export default ColumnList
