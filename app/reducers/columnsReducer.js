import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import union from 'lodash/union'
import { updateObject, createReducer, deleteFromArray } from './reducerUtilities'

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

export const getUniqueColumnTypes = ({columns, typeFilters}) => {
  if (!columns) return []

  typeFilters = typeFilters || []

  let uniqueColTypes = Object.keys(columns).reduce((acc, val) => {
    let index = acc.findIndex((el) => el.label === columns[val].type)

    if (index > -1) {
      acc[index].value += 1
      return acc
    }

    return acc.concat({
      label: columns[val].type,
      value: columns[val].type,
      count: 1,
      isSelected: typeFilters.indexOf(columns[val].type) > -1
    })
  }, [])

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

export const getSelectableColumns = (state, selectedColumn) => {
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
      isCategory: (typeof columns[col].categories !== 'undefined' && columns[col].categories.length > 0),
      isSelected: (selectedColumn === columns[col].key)
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
  let filterPayload

  if (action.payload.key === 'typeFilters') {
    let index = state.typeFilters.indexOf(action.payload.item)
    filterPayload = (index > -1) ? deleteFromArray(state.typeFilters, index) : state.typeFilters.concat(action.payload.item)
  } else if (action.payload.key === 'fieldNameFilter') {
    filterPayload = action.payload.item
  } else {
    return state
  }

  return updateObject(state, {
    [action.payload.key]: filterPayload
  })
}

function sortColumnList (state, action) {
  return updateObject(state, {
    sort: action.payload
  })
}

const columnsReducer = createReducer({ typeFilters: [] }, {
  [ActionTypes.METADATA_SUCCESS]: initColumns,
  [ActionTypes.COLUMNS_SUCCESS]: updateColumns,
  [ActionTypes.COLPROPS_SUCCESS]: loadColumnProperties,
  [ActionTypes.FILTER_COLUMN_LIST]: filterColumnList,
  [ActionTypes.SORT_COLUMN_LIST]: sortColumnList
})

export default columnsReducer
