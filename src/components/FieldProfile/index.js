/*jshint -W065 */
import React, { Component } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import {
  Card,
  CardBlock,
  CardTitle,
  CardText
} from 'react-bootstrap-card';
import './@FieldProfile.css'


class FieldProfile extends Component {

  setClassNamesTypes (fieldType) {
    return 'field-border field-border-type--' + fieldType
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
    if(field.isHeader){
       field.fieldFormatDisplay = null
    }
    return field
  }
  makePopOver(item){
    return (
      <OverlayTrigger key={Math.random()} trigger={['hover', 'focus']} placement={'left'} overlay={<Popover id={'popover-field-profile-column-definition'} title={item.label}>{item.labelDisplay}</Popover>}>
            <td className={'profile-stats-cell profile-stats-header'}>{item.label}</td>
        </OverlayTrigger>
    )
  }
  makeTableRow(item, key){
    let tdHeader = this.makePopOver(item)
    return (
        <tr key={Math.random()}>
          {tdHeader}
        <td className={'profile-stats-cell profile-stats-value'}>{item.value}</td>
      </tr>
    )
  }

  makeCategoryRow(category, key){
    if(!category.category){
      category.category = 'Blank'
    }
    return (
      <tr  key={Math.random()}>
        <td className={'profile-category-cell'}>{category.category}</td>
        <td className={'profile-category-cell'}>{category.count}</td>
      </tr>
    )
  }

  makeProfileStatTableRows(profileInfo){
    let rows = []
    for (let i=0; i < profileInfo.length; i++) {
        rows.push(this.makeTableRow(profileInfo[i], i))
    }
    return rows
  }

  makeCategoryRows(field){
    let categoryInfo = {}
    let categoryRows = []
    let categoryHeader, categoryLen

    if(field.categories){
      categoryLen = field.categories.length
      if(categoryLen > 10){
       categoryLen = 10
       categoryHeader =  'Top 10 Categories in '+ field.name
      }else{
       categoryHeader = String(categoryLen) + ' Categories in ' + field.name
      }
      categoryInfo['categoryLen'] = categoryLen
      categoryInfo['categoryHeader'] = categoryHeader
      field.categories = field.categories.sort(function(a, b){
          return String(parseInt(b.count, 10)- parseInt(a.count, 10))
      })
      for (let i=0; i < categoryLen; i++) {
        categoryRows.push(this.makeCategoryRow(field.categories[i], i))
      }
      categoryInfo['rows'] = categoryRows
    }
    return categoryInfo
  }

  render () {
    let {field, onClick, profileInfo} = this.props
    let cardBorderClassType = this.setClassNamesTypes (field.type)
    field = this.setFieldProps(field)
    let handleOnClick = typeof onClick === 'function'
      ? () => onClick('')
      : false
    let rows = this.makeProfileStatTableRows(profileInfo)
    let categoryInfo = this.makeCategoryRows(field)
    return (
      <Card className={ 'profile-card field-border-top-type--' + field.type} onClick={handleOnClick}>
        <div className={cardBorderClassType}>
          <CardBlock>
            <div className={'profile-field-remove glyphicon glyphicon-remove text-muted'}></div>
            <div>
              <CardTitle className={'profile-field-name'}>{field.label}</CardTitle>
                <div className={'profile-type profile-type-text--' + field.type}>
                  {field.fieldFormatDisplay} </div>
                </div>
                <div className={'text-muted profile-api-key'}>
                  {'API Key: ' + field.key}
                </div>
                <CardText className={'text-left profile-description'}>{field.description}</CardText>
          </CardBlock>
          </div>
          <Choose>
            <When condition={rows.length > 0}>
              <CardBlock className={'profile-main-content'}>
              <div className='profile-stats-container'>
                <div className={'profile-stats-tbl-header'}>
                {'Field Profile Stats'}
              </div>
              <table className={'profile-stats'}>
                <tbody>{rows}</tbody>
              </table>
              </div>
              <Choose>
               <When condition={ categoryInfo.rows }>
              <div className='profile-categories-container'>
                <div className={'profile-categories-tbl-header'}>
                {categoryInfo.categoryHeader}
              </div>
              <table className={'profile-categories-tbl'}>
                <tbody>
                  <tr><th className={'profile-category-cell-hdr'}>{'Value'}</th><th className={'profile-category-cell-hdr'}>{'Count'}</th></tr>
                  {categoryInfo.rows}
                </tbody>
              </table>
              </div>
                 </When>
              </Choose>
              </CardBlock>
            </When>
          </Choose>
      </Card>


     )
  }
}

export default FieldProfile
