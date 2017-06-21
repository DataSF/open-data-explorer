import React from 'react'
import { connect } from 'react-redux'
import { filterColumnList, selectColumn, setHideShow} from '../actions'
import { getUniqueColumnTypes, getSelectableColumns, getSelectedColumnDef, getSelectedField } from '../reducers'
import DefaultListGroup from '../components/DefaultListGroup'
import FieldTypeButton from '../components/FieldTypeButton'
import FieldButton from '../components/FieldButton'
import HideShowButton from '../components/HideShowButton/'
import FieldNameFilter from '../containers/FieldNameFilter'
import { Panel } from 'react-bootstrap'

const TypeFilter = ({items, selectableColumns, onFilter, onSelectColumn, selectedColumnDef, hideshowVal, selectedField, setHideShow, showCols}) => (
  <div>
    <Choose>
      <When condition={selectedColumnDef}>
        <Choose>
          <When condition={showCols !== 'hide'}>
            <Panel collapsible defaultExpanded bsStyle='primary' header='Selected field'>
              <DefaultListGroup
                itemComponent={FieldButton}
                items={selectedField}
                onSelectListItem={onSelectColumn} />
              <HideShowButton itemProps={{'value': hideshowVal, 'isSelected': showCols}} onClick={setHideShow} showCols={showCols} />
            </Panel>
          </When>
          <Otherwise>
            <Panel collapsible defaultExpanded bsStyle='primary' header='Selected field'>
              <DefaultListGroup
                itemComponent={FieldButton}
                items={selectedField}
                onSelectListItem={onSelectColumn} />
              <h5>Filter field list by type</h5>
              <DefaultListGroup
                itemComponent={FieldTypeButton}
                className={'default-list-group'}
                items={items}
                onSelectListItem={onFilter} />
              <FieldNameFilter />
              <DefaultListGroup
                itemComponent={FieldButton}
                items={selectableColumns}
                onSelectListItem={onSelectColumn} />
              <HideShowButton itemProps={{'value': hideshowVal, 'isSelected': showCols}} onClick={setHideShow} showCols={showCols} />
            </Panel>
          </Otherwise>
        </Choose>
      </When>
      <Otherwise>
        <Panel collapsible defaultExpanded header='Select a field' bsStyle={'primary'}>
          <h5>Filter field list by type</h5>
          <DefaultListGroup
            itemComponent={FieldTypeButton}
            className={'default-list-group'}
            items={items}
            onSelectListItem={onFilter} />
          <FieldNameFilter />
          <DefaultListGroup
            itemComponent={FieldButton}
            items={selectableColumns}
            onSelectListItem={onSelectColumn} />
        </Panel>
      </Otherwise>
    </Choose>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  items: getUniqueColumnTypes(state, true),
  selectableColumns: getSelectableColumns(state),
  selectedColumn: state.selectedColumn,
  selectedColumnDef: getSelectedColumnDef(state),
  selectedField: getSelectedField(state),
  hideshowVal: getSelectableColumns(state).length,
  showCols: state.columnProps.showCols
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilter: item => dispatch(filterColumnList('typeFilters', item)),
  onSelectColumn: (key) => dispatch(selectColumn(key)),
  setHideShow: showCols => dispatch(setHideShow(showCols)),
  resetState: resetState => dispatch(resetState())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(TypeFilter)

