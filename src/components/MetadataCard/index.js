import React, { Component } from 'react'
import {
  Card, 
  CardBlock,
  CardTitle,
  CardText,
} from 'react-bootstrap-card';
import './@MetadataCard.css'
class MetadataCard extends Component {
 
  setClassNamesTypes (fieldType, isHeader) {
    if(isHeader){
      return 'cardBorder-header cardBorder-header-type--' + fieldType
    }
    return 'cardBorder-type--' + fieldType
  }

  render () {
    let {field } = this.props
    let cardBorderClassType = this.setClassNamesTypes (field.type, field.isHeader)
    let minMaxInfo
    const COLTYPES = {
      'boolean': 'True/False',
      'text': 'Text',
      'number': 'Number',
      'location': 'Location',
      'date': 'Date', 
      'geometry-line': 'Geometry: Line',
      'geometry-point': 'Geometry: Point',
      'geometry-polygon': 'Geometry: Polygon',
      'geometry-multi-line': 'Geometry: Multiline',
      'geometry-multi-polygon': 'Geometry: Multipolygon',
      'geometry-multi-point': 'Geometry: Multipoint',
    }
    field.fieldFormatDisplay = COLTYPES[field.type]
    if( !field.description && !field.isHeader){
      field.description = 'No definition available'
    }
    if(field.fieldMin && field.fieldMax){
      if(field.fieldType === 'date' ){
        minMaxInfo= "Min Date: " + field.min + "; Max Date: " + field.max
      }else if (field.fieldType === 'number' ){
        minMaxInfo = "Min Value: " + field.min + "; Max Value: " + field.max
      } 
    }
    if(field.isHeader){
       field.fieldFormatDisplay = null
    }
    return (
        <Card className={'cardBorder ' + cardBorderClassType}>
          <CardBlock>
            <CardTitle className={'cardFieldTitle'}>{field.label}</CardTitle>
            <div className={'cardFieldType'}> {field.fieldFormatDisplay} </div>
            <div className={'cardMinMax'}> {minMaxInfo} </div>
            <CardText>{field.description}</CardText>
          </CardBlock>
        </Card>
     )
  }
}

export default MetadataCard