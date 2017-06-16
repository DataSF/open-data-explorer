import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
// import reducers and selectors
import { metadataReducer } from './metadataReducer'
import columnsReducer, * as fromColumns from './columnsReducer'
import { queryReducer } from './queryReducer'
import { chartReducer } from './chartReducer'
import { tableReducer } from './tableReducer'
import { messagesReducer } from './messagesReducer'
import { searchReducer } from './searchReducer'
import fieldsReducer, * as fromFields from './fieldsReducer'


const rootReducer = combineReducers({
  metadata: metadataReducer,
  query: queryReducer,
  chart: chartReducer,
  table: tableReducer,
  columnProps: columnsReducer,
  fieldDetailsProps: fieldsReducer,
  messages: messagesReducer,
  search: searchReducer,
  routing
})

const getColumnDef = (state, column) => fromColumns.getColumnDef(state.columnProps, column)

export const getUniqueColumnTypesDetails = (state, selectable) =>
  fromFields.getUniqueColumnTypes(state.fieldDetailsProps, selectable)

export const getSelectableColumnsDetails = (state, all = false) =>
  fromFields.getSelectableColumns(state.fieldDetailsProps,state.fieldDetailsProps.selectedField, all)

export const getSelectedFieldDetails = state =>
  fromFields.getSelectedFieldDetails(state.fieldDetailsProps,state.fieldDetailsProps.selectedField)

export const getSelectedFieldDef = state =>
  getColumnDef(state, state.fieldDetailsProps.selectedField)




export const getUniqueColumnTypes = (state, selectable) =>
  fromColumns.getUniqueColumnTypes(state.columnProps, selectable)

export const getGroupableColumns = state =>
  fromColumns.getGroupableColumns(state.columnProps, state.query.selectedColumn)

export const getSelectableColumns = (state, all = false) =>
  fromColumns.getSelectableColumns(state.columnProps, state.query.selectedColumn, all)

export const getSummableColumns = state =>
  fromColumns.getSummableColumns(state.columnProps)

export const getSelectedField = state =>
  fromColumns.getSelectedField(state.columnProps, state.query.selectedColumn)

export const getSelectedColumnDef = state =>
  getColumnDef(state, state.query.selectedColumn)

export const getSupportedChartTypes = state =>
  fromColumns.getSupportedChartTypes(state.columnProps, state.query.selectedColumn)

export default rootReducer
