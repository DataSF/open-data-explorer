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
            <Panel collapsible defaultExpanded bsStyle='primary' header={<h4>Selected field <span className='glyphicon collapse-icon' ariaHidden></span></h4>}>
              <DefaultListGroup
                itemComponent={FieldButton}
                items={selectedField}
                popOverPlacement={'left'}
                onSelectListItem={onSelectColumn} />
              <HideShowButton itemProps={{'value': hideshowVal, 'isSelected': showCols}} onClick={setHideShow} showCols={showCols} />
            </Panel>
          </When>
          <Otherwise>
            <Panel collapsible defaultExpanded bsStyle='primary' header={<h4>Selected field <span className='glyphicon collapse-icon' ariaHidden></span></h4>}>
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
                popOverPlacement={'left'}
                onSelectListItem={onSelectColumn} />
              <HideShowButton itemProps={{'value': hideshowVal, 'isSelected': showCols}} onClick={setHideShow} showCols={showCols} />
            </Panel>
          </Otherwise>
        </Choose>
      </When>
      <Otherwise>
        <Panel collapsible defaultExpanded header={<h4>Select a field <span className='glyphicon collapse-icon' ariaHidden></span></h4>} bsStyle={'primary'}>
          <h5>Filter field list by type</h5>
          <DefaultListGroup
            itemComponent={FieldTypeButton}
            className={'default-list-group'}
            items={items}
            onSelectListItem={onFilter} />
          <FieldNameFilter />
          <DefaultListGroup
            popOverPlacement={'left'}
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
  onFilter: item => dispatch(filterColumnList('typeFilters', item, 'columnProps')),
  onSelectColumn: (key) => dispatch(selectColumn(key)),
  setHideShow: showCols => dispatch(setHideShow(showCols, 'columnProps')),
  resetState: resetState => dispatch(resetState('columnProps'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(TypeFilter)

