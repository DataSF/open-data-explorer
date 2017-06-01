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

const rootReducer = combineReducers({
  metadata: metadataReducer,
  query: queryReducer,
  chart: chartReducer,
  table: tableReducer,
  columnProps: columnsReducer,
  messages: messagesReducer,
  search: searchReducer,
  routing
})

const getColumnDef = (state, column) => fromColumns.getColumnDef(state.columnProps, column)

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
