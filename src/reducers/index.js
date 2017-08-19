import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
// import reducers and selectors
import { metadataReducer, makeDatasetFactDict, makeColTypesCnt, makePublishingFacts, calculatePublishingHealth } from './metadataReducer'
import columnsReducer, * as fromColumns from './columnsReducer'
import { queryReducer } from './queryReducer'
import { chartReducer } from './chartReducer'
import { tableReducer } from './tableReducer'
import { messagesReducer } from './messagesReducer'
import { searchReducer } from './searchReducer'
import { uiReducer } from './uiReducer'
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
  ui: uiReducer,
  routing
})

const getColumnDef = (state, column) => fromColumns.getColumnDef(state.columnProps, column)
const getFieldDetailsDef = (state, column) => fromFields.getColumnDef(state.columnProps, column)
const getFieldProfileDef = (state, column) => fromFields.getFieldProfileInfo(state.columnProps,  column)


export const getUniqueColumnTypesDetails = (state, selectable) =>
  fromFields.getUniqueColumnTypes(state.fieldDetailsProps, selectable)

export const getSelectableColumnsDetails = (state, all = true, ignoreTypeFilters = false, exclude = []) => {
  let modifiedState = {
    columns: state.columnProps.columns,
    typeFilters: [].concat(state.fieldDetailsProps.typeFilters) || [],
    fieldNameFilter: state.fieldDetailsProps.fieldNameFilter
  }
  return fromColumns.getSelectableColumns(modifiedState, state.fieldDetailsProps.selectedField, all, ignoreTypeFilters, [state.fieldDetailsProps.selectedField])
}
  

export const getSelectedFieldDetails = state =>
  fromFields.getSelectedFieldDetails(state.fieldDetailsProps, state.fieldDetailsProps.selectedField)

export const getSelectedFieldDef = state =>
  getFieldDetailsDef(state, state.fieldDetailsProps.selectedField)

export const getFieldProfileInfo = state =>
  getFieldProfileDef(state, state.fieldDetailsProps.selectedField)

export const getUniqueColumnTypes = (state, selectable) =>
  fromColumns.getUniqueColumnTypes(state.columnProps, selectable)

export const getGroupableColumns = state =>
  fromColumns.getGroupableColumns(state.columnProps, state.query.selectedColumn)

export const getSelectableColumns = (state, all = false, ignoreTypeFilters = false, exclude = []) => 
  fromColumns.getSelectableColumns(state.columnProps, state.query.selectedColumn, all, ignoreTypeFilters, exclude)

export const getFilterableColumns = (state, exclude = []) =>
  fromColumns.getSelectableColumns(state.columnProps, state.query.selectedColumn, false, true, exclude, true)

export const getSummableColumns = state =>
  fromColumns.getSummableColumns(state.columnProps)

export const getSelectedField = state =>
  fromColumns.getSelectedField(state.columnProps, state.query.selectedColumn)

export const getSelectedColumnDef = state =>
  getColumnDef(state, state.query.selectedColumn)

export const getSupportedChartTypes = state =>
  fromColumns.getSupportedChartTypes(state.columnProps, state.query.selectedColumn)

export const makeDatasetFactDictFxn = state =>
  makeDatasetFactDict(state)

export const makeColTypesCntFxn = state =>
  makeColTypesCnt(state)

export const makePublishingFactsFxn =  state =>
  makePublishingFacts(state)

export const calculatePublishingHealthFxn = state =>
  calculatePublishingHealth(state)


export default rootReducer
