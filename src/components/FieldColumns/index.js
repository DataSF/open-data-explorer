import React, { Component } from 'react'
import {
  Card, CardSubtitle,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
  CardColumns,
  CardImg
} from 'react-bootstrap-card';
import { Panel, Row, Col, Button } from 'react-bootstrap'
import MetadataCard from '../MetadataCard'
import './@FieldColumns.css'
import _ from 'lodash'

class FieldColumns extends Component {
  makeMetadataCards(fieldList){
    let fieldCards = fieldList.map(function(field){
      if(field){
       if (field.name) {
        let fieldIndex = fieldList.indexOf(field)
          return (
            <MetadataCard
            key={fieldIndex}
            name={field.name}
            fieldFormat={field.format}
            description={field.description}
            fieldMin={field.min}
            fieldMax={field.max} />
          )
        }
      }
      })
    return fieldCards
  }

  getHeaders(fieldList, sortBy ){
    let headersList
    if(sortBy === 'alpha'){
      headersList = fieldList.map(function(field){
        if (field.name) {
          return field.name.charAt(0)
        }
      })
    }
    let headersListCnt = _.countBy(headersList, _.identity)
    let arrHeads = Object.keys(headersListCnt).filter(function(n){ return n != "undefined" }); 
    let headerItems = arrHeads.map(function(key){
      if(key){
          return {'name': key.toUpperCase() + " => ("+ String(headersListCnt[key]) + ")"  }
      }
    })
    return headerItems
  }

  render () {
    let {fieldList, sortBy } = this.props
    fieldList =  fieldList[0].filter(function(n){ return n != "undefined" }); 
 
    let headersList = this.getHeaders(fieldList, sortBy )
    let fieldCards = fieldList.concat(headersList)
    
    fieldCards =  fieldCards.filter(function(n){ return n != "undefined" }); 
    fieldCards = fieldCards.map(function(item){
      if(item){
        if (typeof item.name !== 'undefined') {
          if(item.name !== null){
          return item
        }
        }
      }
    })
    fieldCards =  fieldCards.filter(function(n){ return n != "undefined" }); 

    fieldCards = fieldCards.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    fieldCards = this.makeMetadataCards(fieldCards)
    return (
    <CardColumns>
        {fieldCards}
    </CardColumns>
         )
  }
}

export default FieldColumns