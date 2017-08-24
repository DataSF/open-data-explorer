import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import FieldColumns from '../components/FieldColumns'
import { filterColumnList, selectField, setHideShow, sortColumnList, displayFieldProfilesList } from '../actions'
import { getUniqueColumnTypesDetails, getSelectableColumnsDetails, getSelectedFieldDef, getSelectedFieldDetails, getFieldProfileInfo} from '../reducers'
import FieldProfile from '../components/FieldProfile'
import FieldDefFieldSelector from './FieldDefFieldSelector'
import { setDocumentTitle } from '../helpers'

const ColumnDetails = ({name, topOffset, list, filters, onFilter, sort, onSort, fieldTypeItems, selectableColumns, onSelectColumn, selectedColumnDef, hideshowVal, selectedField, setHideShow, showCols, selectedProfileInfo, selectedCategories, containerHeight, displayFieldProfilesList, displayType}) => {
  let absoluteTop = {
      top: (10) + 'px'
    }

  if(name) {
    setDocumentTitle(name + ' | Field Definitions')
  }
  
  let containerHeightStyle = {
    height: (containerHeight-topOffset-50) + 'px', 'position': 'relative'
  }
  return (

  <div className={'container'}style={containerHeightStyle}>
    <Row>
    <Col sm={3} className={'field-details-panel-picker-container'} style={absoluteTop}>
    <FieldDefFieldSelector />
    </Col>
    <Col sm={9} className={'column-details-container-wrapper'} style={absoluteTop}>
      <Row>
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
          <Row>
          <Col sm={8}></Col>
          <Col sm={4} className={'list-card-option-col'}>
            <div className={'list-card-option-wrapper'}>
              <div className={'list-card-option list-card-option-text'}> {'Display: '} </div>
              <div
                className={'list-card-option glyphicon glyphicon-th'}
                onClick={ displayFieldProfilesList.bind(this, 'cards')}>
              </div>
              <div
                className={'list-card-option glyphicon glyphicon-th-list'}
                onClick={ displayFieldProfilesList.bind(this, 'lst')}>
                </div>


            </div>
          </Col>
          </Row>
            <div className={'columnDetailsContainer'}>
              <FieldColumns
              fieldList={list}
              sortBy={'type'}
              displayType={displayType}
              onClick={onSelectColumn}/>
            </div>
        </Otherwise>
        </Choose>
      </Row>
    </Col>
    </Row>
  </div>)
}

const mapStateToProps = (state, ownProps) => {
  let selectable = getSelectableColumnsDetails(state, true)
  return {
    list: selectable || {},
    fieldTypeItems: getUniqueColumnTypesDetails(state, true),
    selectableColumns: getSelectableColumnsDetails(state),
    selectedColumn: state.fieldDetailsProps.selectedColumn,
    displayType: state.fieldDetailsProps.displayType || 'chart',
    selectedColumnDef: getSelectedFieldDef(state),
    selectedProfileInfo: getFieldProfileInfo(state),
    selectedField: getSelectedFieldDetails(state),
    showCols: state.fieldDetailsProps.showCols,
    selectedCategories: state.fieldDetailsProps.selectedCategories,
    containerHeight: ownProps.viewportHeight,
    topOffset: ownProps.topOffset

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  displayFieldProfilesList: (displayType) => dispatch(displayFieldProfilesList(displayType)),
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

