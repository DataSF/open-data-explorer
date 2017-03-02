import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import union from 'lodash/union'
import uniq from 'lodash/uniq'
import { updateObject, createReducer } from './reducerUtilities'

function sortColumns (a, b) {
  if (a.label < b.label) {
    return -1
  }
  if (a.label > b.label) {
    return 1
  }
  return 0
}

// selectors
export const getColumnDef = (state, column) => state && state.columns ? state.columns[column] : null

export const getUniqueColumnTypes = (state) => {
  let { columns } = state
  if (!columns) return []

  let uniqueColTypes = uniq(Object.keys(columns).map((col, idx, arr) => {
    return columns[col].type
  }))

  return uniqueColTypes
}

// refactor this to pass in a filter callback to a single column filtering function
export const getGroupableColumns = (state, selectedColumn) => {
  let { columns } = state
  selectedColumn = selectedColumn || ''
  if (!columns) return []

  return Object.keys(columns).filter((col) => {
    return (columns[col].key !== selectedColumn && columns[col].categories)
  }).map((col) => {
    return {label: columns[col].name, value: columns[col].key}
  }).sort(sortColumns)
}

export const getSelectableColumns = (state) => {
  let { columns } = state
  let colTypesAccepted = ['number', 'checkbox', 'date']
  let regex = /(^(lat|lon)[a-z]*|^(x|y)$)/i
  if (!columns) return []

  return Object.keys(columns).filter((col) => {
    let geoFields = regex.test(columns[col].key)
    return (!columns[col].unique && !geoFields && ((columns[col].categories && ['text', 'number'].indexOf(columns[col].type) > -1) || colTypesAccepted.indexOf(columns[col].type) > -1))
  }).map((col) => {
    return {
      label: columns[col].name,
      value: columns[col].key,
      type: columns[col].type,
      isCategory: (columns[col].categories)
    }
  }).sort(sortColumns)
}

export const getSummableColumns = (state) => {
  let { columns } = state
  let colTypesAccepted = ['number', 'money', 'double']

  if (!columns) return []

  return Object.keys(columns).filter((col) => {
    return (!columns[col].categories && !columns[col].unique && colTypesAccepted.indexOf(columns[col].type) > -1)
  }).map((col) => {
    return {label: columns[col].name, value: columns[col].key}
  }).sort(sortColumns)
}

// case reducers
function initColumns (state, action) {
  return updateObject(state, {
    columns: action.response.columns
  })
}

function updateColumns (state, action) {
  return merge({}, state, action.response)
}

function loadColumnProperties (state, action) {
  action.response.categoryColumns = union([], state.categoryColumns, action.response.categoryColumns)
  return merge({}, state, action.response)
}

function filterColumnList (state, action) {
  return updateObject(state, {
    filter: action.filterType
  })
}

function sortColumnList (state, action) {
  return updateObject(state, {
    sort: action.payload
  })
}

const columnsReducer = createReducer({}, {
  [ActionTypes.METADATA_SUCCESS]: initColumns,
  [ActionTypes.COLUMNS_SUCCESS]: updateColumns,
  [ActionTypes.COLPROPS_SUCCESS]: loadColumnProperties,
  [ActionTypes.FILTER_COLUMN_LIST]: filterColumnList,
  [ActionTypes.SORT_COLUMN_LIST]: sortColumnList
})

export default columnsReducer
