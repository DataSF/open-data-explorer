import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import FieldColumns from '../components/FieldColumns'
import { filterColumnList, selectField, setHideShow, sortColumnList} from '../actions'
import { getUniqueColumnTypesDetails, getSelectableColumnsDetails, getSelectedFieldDef, getSelectedFieldDetails} from '../reducers'
import DefaultListGroup from '../components/DefaultListGroup'
import FieldTypeButton from '../components/FieldTypeButton'
import FieldButton from '../components/FieldButton'
import HideShowButton from '../components/HideShowButton/'
import FieldNameFilterDetails from '../containers/FieldNameFilterDetails'
import { Panel } from 'react-bootstrap'


const ColumnDetails = ({list, filters,  onFilter, sort, onSort, items, selectableColumns, onSelectColumn, selectedColumnDef, hideshowVal, selectedField, setHideShow, showCols}) => (
  <Row>
    <Col sm={3}>
      <div>
    <Choose>
      <When condition={selectedColumnDef}>
        <Choose>
          <When condition={showCols !== 'hide'}>
            <Panel collapsible defaultExpanded bsStyle='primary' header='Selected Field'>
              <DefaultListGroup
                itemComponent={FieldButton}
                items={selectedField}
                onSelectListItem={onSelectColumn}
                popOverPlacement={'right'} />
              <HideShowButton itemProps={{'value': hideshowVal, 'isSelected': showCols}} onClick={setHideShow} showCols={showCols} />
            </Panel>
          </When>
          <Otherwise>
            <Panel collapsible defaultExpanded bsStyle='primary' header='Selected Field'>
              <DefaultListGroup
                itemComponent={FieldButton}
                items={selectedField}
                onSelectListItem={onSelectColumn} />
              <DefaultListGroup
                itemComponent={FieldTypeButton}
                className={'default-list-group'}
                items={items}
                onSelectListItem={onFilter} />
              <FieldNameFilterDetails />
              <DefaultListGroup
                itemComponent={FieldButton}
                items={selectableColumns}
                onSelectListItem={onSelectColumn}
                popOverPlacement={'right'} />
              <HideShowButton itemProps={{'value': hideshowVal, 'isSelected': showCols}} onClick={setHideShow} showCols={showCols} />
            </Panel>
          </Otherwise>
        </Choose>
      </When>
      <Otherwise>
        <Panel collapsible defaultExpanded header='Select a field' bsStyle={'primary'}>
          <DefaultListGroup
            itemComponent={FieldTypeButton}
            className={'default-list-group'}
            items={items}
            onSelectListItem={onFilter} />
          <FieldNameFilterDetails />
          <DefaultListGroup
            itemComponent={FieldButton}
            items={selectableColumns}
            popOverPlacement={'right'}
            onSelectListItem={onSelectColumn} />
        </Panel>
      </Otherwise>
    </Choose>
  </div>
    </Col>
    <Col sm={9}>
      <Choose>
        <When condition={selectedColumnDef}>
          <h1> COL selected </h1>
        </When>
        <Otherwise>
          <FieldColumns
          fieldList={list} 
          sortBy={'type'}/>
        </Otherwise>
      </Choose>
    </Col>
  </Row>
)

const mapStateToProps = (state, ownProps) => {
  let selectable = getSelectableColumnsDetails(state)
  return {
    list: selectable  || {},
    items: getUniqueColumnTypesDetails(state, true),
    selectableColumns: getSelectableColumnsDetails(state),
    selectedColumn: state.fieldDetailsProps.selectedColumn,
    selectedColumnDef: getSelectedFieldDef(state),
    selectedField: getSelectedFieldDetails(state),
    hideshowVal: getSelectableColumnsDetails(state).length,
    showCols: state.fieldDetailsProps.showCols
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

