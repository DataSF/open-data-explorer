import React, { PropTypes } from 'react'
import { Col, Label, Panel } from 'react-bootstrap'

const labelStyle = {
  marginRight: '5px'
}

const humanType = {
  'text': 'Text',
  'category': 'Category',
  'checkbox': 'True/False',
  'date': 'Date/Time',
  'location': 'Latitude and Longitude',
  'number': 'Number'
}

const ColumnCard = ({item, idx}) => {
  return (
    <Col md={12} key={idx}>
      <Panel header={<h2>item.name</h2>} className={'descriptionPanel'}>
        <p> {item.description}</p>
        <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>Field type: {humanType[item.type]} </Label>
        <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>API name: {item.key}</Label>
      </Panel>
    </Col>
  )
}

const ColumnList = ({list}) => {
  let keys = Object.keys(list)
  let listItems = keys.map((key, idx) => {
    return <ColumnCard item={list[key]} idx />
  })

  return (
    <div className={'descriptionPanelHead'}>
      {listItems}
    </div>
  )
}

ColumnList.propTypes = {
  list: PropTypes.object.isRequired
}

export default ColumnList
