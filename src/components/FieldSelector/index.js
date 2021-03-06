import React from 'react'
import { Panel } from 'react-bootstrap'

import DefaultListGroup from '../DefaultListGroup'
import FilterListInput from '../FilterListInput'
import HideShowButton from '../HideShowButton'

import TypeButtonComponent from '../FieldTypeButton'
import FieldButtonComponent from '../FieldButton'

import './@FieldSelector.css'

const FieldSelector = ({searchValue, title, types, onSelectListItem, showCols, setHideShow, popOverPlacement, selectableColumns, selectedField, onSelectColumn, onFilterTypes, onFilterList}) => {
  return (
    <Panel className='FieldSelector__root' collapsible defaultExpanded bsStyle='primary' header={<h4>{title} <span className='glyphicon collapse-icon' aria-hidden></span></h4>}>
      {selectedField.length > 0 ?
      <DefaultListGroup
        itemComponent={FieldButtonComponent}
        items={selectedField}
        popOverPlacement={popOverPlacement}
        onSelectListItem={onSelectColumn} />
      : null}
      {selectedField.length === 0 || showCols ?
      (<div className={'FieldSelector__field-types-search-wrapper'}>
        <h5>Filter field list by type</h5>
        <DefaultListGroup
          itemComponent={TypeButtonComponent}
          className={'default-list-group'}
          items={types}
          onSelectListItem={onFilterTypes} />
        <div className={'FieldSelector__field-search'}>
          <FilterListInput onFilter={onFilterList} searchValue={searchValue} />
          <DefaultListGroup
            itemComponent={FieldButtonComponent}
            items={selectableColumns}
            popOverPlacement={popOverPlacement}
            onSelectListItem={onSelectColumn} />
        </div>
      </div>)
      : null }
      {selectedField.length > 0 ?
      <HideShowButton itemProps={{'value': selectableColumns ? selectableColumns.length + 1 : 0, 'isSelected': showCols}} onClick={setHideShow} showCols={showCols} />
      : null }
    </Panel>)
}

export default FieldSelector