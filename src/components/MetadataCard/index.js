import React, { Component } from 'react'
import {
  Card, 
  CardBlock,
  CardTitle,
  CardText,
} from 'react-bootstrap-card';
import './@MetadataCard.css'
class MetadataCard extends Component {

  render () {
    let {name, fieldFormat, description, fieldMin, fieldMax } = this.props
    let minMaxInfo
    if(fieldMin && fieldMax){
      if(fieldFormat === 'date' ){
        minMaxInfo= "Min Date: " + fieldMin + "; Max Date: " + fieldMax
      }else if (fieldFormat === 'number' ){
        minMaxInfo = "Min Value: " + fieldMin + "; Max Value: " + fieldMax
      } 
    }
    if(fieldFormat){
      fieldFormat = fieldFormat.charAt(0).toUpperCase() + fieldFormat.slice(1)
    }
       return (
        <Card className={'cardBorder'}>
          <CardBlock>
            <CardTitle className={'cardFieldTitle'}>{name}</CardTitle>
            <div className={'cardFieldType'}> {fieldFormat} </div>
            <div className={'cardMinMax'}> {minMaxInfo} </div>
            <CardText>{description}</CardText>
          </CardBlock>
      </Card>
     )
  }
}

export default MetadataCard