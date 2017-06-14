import React, { Component } from 'react'
import {
  CardColumns,
} from 'react-bootstrap-card'
import MetadataCard from '../MetadataCard'
import './@FieldColumns.css'
import _ from 'lodash'

class FieldColumns extends Component {
  
  makeMetadataCards(fieldList){
    let fieldCards = fieldList.map(function(field){
      if(field){
       if (field.label) {
        let fieldIndex = fieldList.indexOf(field)
          return (
            <MetadataCard
            key={fieldIndex}
            field={field} />
          )
        }
      }
      return false
      })
    return fieldCards
  }

  getHeaders(fieldList, sortBy, COLTYPES ){
    let headersList = []
    let headerItems = []
    let arrHeads = []
    if(sortBy === 'alpha'){
      fieldList.forEach(function(field){
        if (field.label) {
          headersList.push(field.label.charAt(0))
        }
      })
      let headersListCnt = _.countBy(headersList, _.identity)
      arrHeads = Object.keys(headersListCnt).filter(function(n){ return n !== "undefined" }); 
      headerItems = arrHeads.map(function(key){
        if(key)
        {
          return {'label': key.toUpperCase() + " => "+ String(headersListCnt[key]) + "" , 'isHeader': true }
        }
        return false
      })
    }
    if(sortBy === 'type'){
      fieldList.forEach(function(field){
        if (field.type) {
          headersList.push(field.type)
        }
      })
      let headersListCnt = _.countBy(headersList, _.identity)
      arrHeads = Object.keys(headersListCnt).filter(function(n){ return n !== "undefined" }); 
      console.log(COLTYPES)
      headerItems = arrHeads.map(function(key){
        if(key){
          return {'label': COLTYPES[key] + ":", 'type': key, 'isHeader': true, 'field_count': String(headersListCnt[key]) }
        }
        return false
      })
    }
    return {'headerItems': headerItems, 'headerTypes': arrHeads}
  }

  translateFieldObjToArry(columns){
    let allCols = []
    Object.keys(columns).forEach(function(col){
      allCols.push(columns[col])
    })
    return allCols
  }

  cardSort(fieldCards, sortBy, headerTypes=false){
    if(sortBy === 'alpha'){
      fieldCards = fieldCards.sort(function(a, b) {
        var textA = a.label.toUpperCase();
        var textB = b.label.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
    if(sortBy === 'type'){
      let sortedFieldCards = []
      headerTypes.forEach(function(key){
        let keys = [key]
        let filteredArray = fieldCards.filter(function(itm){
          return keys.indexOf(itm.type) > -1;
        })
        sortedFieldCards.push(filteredArray)
      })
      fieldCards =  [].concat.apply([], sortedFieldCards)
    }
    return fieldCards
  }

  render () {
    let {fieldList, sortBy } = this.props
    let fieldCards = []
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
    if(Object.keys(fieldList).length > 0){
      let headersObj = this.getHeaders(fieldList, sortBy, COLTYPES )
      fieldCards = headersObj.headerItems.concat(fieldList)
      fieldCards =  fieldCards.filter(function(n){ return n !== "undefined" })
      fieldCards = fieldCards.map(function(item){
        if(item){
          if (typeof item.label !== 'undefined') {
            if(item.label !== null){
              return item
            }
          }
        }
        return false
      })

    fieldCards =  fieldCards.filter(function(n){ return n !== "undefined" })
    fieldCards = this.cardSort(fieldCards, sortBy,  headersObj.headerTypes)
    fieldCards = this.makeMetadataCards(fieldCards)
    }

    return (
    <CardColumns>
        {fieldCards}
    </CardColumns>
         )
  }
}

export default FieldColumns