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
      return 'cardBorder-header align-middle cardBorder-header-type--' + fieldType
    }
    return 'cardBorder cardBorder-type--' + fieldType
  }

  setFieldProps(field){
    if(field.min && field.max){
      if(field.type === 'date' ){
        field.minInfo = "Min Date: " + field.min 
        field.maxInfo = "Max Date: " + field.max
      }else if (field.type === 'number' ){
        field.minInfo = "Min Value: " + field.min 
        field.maxInfo = "Max Value: " + field.max
      } 
    }
    if(field.type === 'text' && !field.isHeader){
      field.minInfo = 'Number of categories: ' + field.cardinality
    }
    if( !field.description && !field.isHeader && !field.globalDescription) {
      field.description = 'No definition available'
    }
    if(field.globalDescription){
      field.description = field.globalDescription
    }
    if(field.isHeader){
       field.fieldFormatDisplay = null
    }
    return field
  }

  render () {
    let {field, onClick } = this.props
    let cardBorderClassType = this.setClassNamesTypes (field.type, field.isHeader)
    field = this.setFieldProps(field)
    let handleOnClick = typeof onClick === 'function'
      ? () => onClick(field.key)
      : false
    return (
        <Card className={ cardBorderClassType} onClick={handleOnClick}>
           
          <CardBlock>
            <CardTitle className={'cardFieldTitle'}>{field.label}</CardTitle>
            <Choose>
              <When condition={!field.isHeader}>
                <div className={'cardFieldType'}> {field.fieldFormatDisplay} </div>
                <div className={'cardMinMax text-muted'}> {'API key: ' + field.key} </div>
                <Choose>
                  <When condition={field.minInfo}>
                    <div className={'cardMinMax text-muted'}>
                      <div> {field.minInfo} </div>
                      <div> {field.maxInfo} </div>
                    </div>
                  </When>
                </Choose>
                <CardText className={'text-left details-description'}>{field.description}</CardText>
              </When>
            </Choose>
          </CardBlock>
        </Card>
     )
  }
}

export default MetadataCard