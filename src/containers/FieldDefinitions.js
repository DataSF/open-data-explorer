import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import FieldColumns from '../components/FieldColumns'
import { filterColumnList, selectField, setHideShow, sortColumnList} from '../actions'
import { getUniqueColumnTypesDetails, getSelectableColumnsDetails, getSelectedFieldDef, getSelectedFieldDetails, getFieldProfileInfo} from '../reducers'
import FieldProfile from '../components/FieldProfile'
import FieldDefFieldSelector from './FieldDefFieldSelector'
import { setDocumentTitle } from '../helpers'

const ColumnDetails = ({name, topOffset, list, filters, onFilter, sort, onSort, fieldTypeItems, selectableColumns, onSelectColumn, selectedColumnDef, hideshowVal, selectedField, setHideShow, showCols, selectedProfileInfo, selectedCategories }) => {
  let absoluteTop = {
      top: (topOffset) + 'px'
    }
  
  if(name) {
    setDocumentTitle(name + ' | Field Definitions')
  }
  return (
  <Row className={'column-details-all-container'}>
    <Col sm={3} className={'field-details-panel-picker-container'} style={absoluteTop}>
    <FieldDefFieldSelector />
    </Col>
    <Col sm={9} className={'column-details-container-wrapper'} style={absoluteTop}>
      <Choose>
        <When condition={selectedColumnDef}>
          <div className={'fieldProfileContainer'}>
            <FieldProfile
              field={selectedColumnDef}
              profileInfo={selectedProfileInfo}
              selectedCategories = {selectedCategories}
              onClick={ onSelectColumn.bind(this, '')} />
          </div>
        </When>
        <Otherwise>
          <div className={'columnDetailsContainer'}>
            <FieldColumns
            fieldList={list}
            sortBy={'type'}
            onClick={onSelectColumn}
            />
          </div>
        </Otherwise>
      </Choose>
    </Col>
  </Row>)
}

const mapStateToProps = (state, ownProps) => {
  let selectable = getSelectableColumnsDetails(state)
  return {
    list: selectable || {},
    fieldTypeItems: getUniqueColumnTypesDetails(state, true),
    selectableColumns: getSelectableColumnsDetails(state),
    selectedColumn: state.fieldDetailsProps.selectedColumn,
    selectedColumnDef: getSelectedFieldDef(state),
    selectedProfileInfo: getFieldProfileInfo(state),
    selectedField: getSelectedFieldDetails(state),
    hideshowVal: getSelectableColumnsDetails(state).length,
    showCols: state.fieldDetailsProps.showCols,
    selectedCategories: state.fieldDetailsProps.selectedCategories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  onSort: (sort) => dispatch(sortColumnList(sort)),
  onFilter: item => dispatch(filterColumnList('typeFilters', item, 'fieldDetailsProps')),
  onSelectColumn: (key) => dispatch(selectField(key)),
  setHideShow: showCols => dispatch(setHideShow(showCols, 'fieldDetailsProps')),
  resetState: resetState => dispatch(resetState('fieldDetailsProps'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnDetails)

