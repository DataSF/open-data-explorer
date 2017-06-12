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
      return false
      })
    return fieldCards
  }

  getHeaders(fieldList, sortBy ){
    let headersList
    if(sortBy === 'alpha'){
      Object.keys(fieldList).forEach(function(field){
        if (field.name) {
          headersList.push(field.name.charAt(0))
        }
      })
    }
    let headersListCnt = _.countBy(headersList, _.identity)
    let arrHeads = Object.keys(headersListCnt).filter(function(n){ return n !== "undefined" }); 
    let headerItems = arrHeads.map(function(key){
      if(key){
          return {'name': key.toUpperCase() + " => ("+ String(headersListCnt[key]) + ")"  }
      }
      return false
    })
    return headerItems
  }
  translateFieldObjToArry(columns){
    let allCols = []
    Object.keys(columns).forEach(function(col){
      allCols.push(columns[col])
    })
    return allCols
  }

  render () {
    let {fieldList, sortBy } = this.props
    console.log('*** field List*****')
    console.log(fieldList)
    let fieldCards = []
    if(Object.keys(fieldList).length > 0){
      let headersList = this.getHeaders(fieldList, sortBy )
      console.log(headersList)
      let fieldListArr = this.translateFieldObjToArry(fieldList)
      fieldCards = fieldListArr.concat(headersList)
      fieldCards =  fieldCards.filter(function(n){ return n !== "undefined" })
      fieldCards = fieldCards.map(function(item){
      if(item){
        if (typeof item.name !== 'undefined') {
          if(item.name !== null){
          return item
        }
        }
      }
      return false
    })
    fieldCards =  fieldCards.filter(function(n){ return n !== "undefined" })

    fieldCards = fieldCards.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
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