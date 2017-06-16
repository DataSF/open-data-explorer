import React, { Component } from 'react'
import {
  Card, 
  CardBlock,
  CardTitle,
} from 'react-bootstrap-card';
import './@FieldProfile.css'


class FieldProfile extends Component {

  setClassNamesTypes (fieldType) {
    return 'fieldBorder fieldBorder-type--' + fieldType
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
    if( !field.description && !field.isHeader && !field.globalDescription) {
      field.description = 'No definition available'
    }
    return field
  }

  render () {


    let {field, onClick} = this.props
    let cardBorderClassType = this.setClassNamesTypes (field.type)
    field = this.setFieldProps(field)
    let handleOnClick = typeof onClick === 'function'
      ? () => onClick('')
      : false
    return (
        <Card className={ cardBorderClassType} onClick={handleOnClick}>
          <CardBlock>
            <CardTitle className={'fieldTitle'}>{field.label}</CardTitle>
                <table className={'fieldProfile'}>
                <tr>
                  <td>Field Type</td>
                  <td>{field.fieldFormatDisplay}</td>
                </tr>
                <tr>
                <td> Field Defintion </td>
                <td> {field.description} </td>
                </tr>
              </table>
          </CardBlock>
        </Card>
     )
  }
}

export default FieldProfile