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
        field.minMaxInfoHeader = "Date Range"
        field.minMax = field.min + " to " + field.max
      }else if (field.type === 'number' ){
        field.minMaxInfoHeader = "Value Range"
        field.minMax = field.min +  " to " + field.max
      }
    }
    if(field.type === 'text' && !field.isHeader){
      field.minMaxInfoHeader = 'Number of Categories'
      field.minMax = field.cardinality
    }
    if( !field.description && !field.isHeader && !field.globalDescription) {
      field.description = 'No definition available'
    }
    if(field.globalDescription){
      field.description = field.globalDescription
    }
    if(field.description){
      if(field.description.split(" ").length > 60){
        field.description = field.description.split(" ").slice(0, 59).join(" ")+ " ..."
      }
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
        <Choose>
          <When condition={field.isHeader}>
            <Card className={cardBorderClassType} onClick={handleOnClick}>
              <CardBlock>
                <CardTitle className={'cardFieldTitleHeader metadata-card-type--'+ field.type}>
                  {field.label}
                  <span className={'cardFieldTitleCount text-muted'}> {field.field_count }</span>
                </CardTitle>
              </CardBlock>
            </Card>
          </When>
          <Otherwise>
            <Card className={'metadata-cards cardHolder cardBorderTop-type--' + field.type} onClick={handleOnClick}>
              <div className={cardBorderClassType}>
                <CardBlock>
                <div className={'metadataCardHeader'}>
                  <CardTitle className={'cardFieldTitle'}>{field.label}</CardTitle>
                  <div className={'cardFieldType metadata-card-type--' + field.type}> {field.fieldFormatDisplay} </div>
                  </div>
                </CardBlock>
              </div>
              <CardBlock>
                <CardText className={'text-left details-description'}>{field.description}</CardText>
                <Choose>
                  <When condition={field.minMaxInfoHeader}>
                    <div className={'metatadata-card-min-max text-muted'}>
                      <div> {field.minMaxInfoHeader} </div>
                      <div className={'metatadata-card-text-indent'}>
                        &#183; {field.minMax}
                      </div>
                    </div>
                  </When>
                </Choose>
                <div className={'metadata-card-api-key text-muted'}>
                  <div>{'API Key'} </div>
                  <div className={'metatadata-card-text-indent'}>
                    &#183; {field.key}
                  </div>
                </div>
              </CardBlock>
            </Card>
          </Otherwise>
        </Choose>

     )
  }
}

export default MetadataCard
