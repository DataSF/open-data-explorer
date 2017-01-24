import React, { Component } from 'react'
import {Row, Col, Panel, Label} from 'react-bootstrap'

var labelStyle = {
  marginRight: '5px'
}

var humanType = {
  'text': 'Text',
  'category': 'Category',
  'checkbox': 'True/False',
  'date': 'Date/Time',
  'location': 'Latitude and Longitude',
  'number': 'Number'
}

class DatasetDetails extends Component {

  renderColumnCard (key, idx, columns) {
    let column = columns[key]
    let title = <h2>{column.name}</h2>
    return (
      <Col md={4} key={idx}>
        <Panel header={title} className={'descriptionPanel'}>
          <p> {column.description}</p>
          <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>Field type: {humanType[column.type]} </Label>
          <Label bsStyle='info' style={labelStyle} className={'descriptionPanelField'}>API name: {column.key}</Label>
        </Panel>
      </Col>
    )
  }

  render () {
    let { columns } = this.props
    console.log(columns)
    let rows = []
    if (columns) {
      let keys = Object.keys(columns)
      let definitions = keys.map((key, idx) => {
        return this.renderColumnCard(key, idx, columns)
      })
      for (let i = 0; i < keys.length; i += 3) {
        rows.push(
          <Row key={i}>
            {definitions[i]}
            {definitions[i + 1]}
            {definitions[i + 2]}
          </Row>)
      }
    }

    return (
      <div className={'descriptionPanelHead'}>
        {rows}
      </div>
    )
  }
}

export default DatasetDetails
