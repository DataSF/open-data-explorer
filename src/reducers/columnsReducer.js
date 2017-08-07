import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import union from 'lodash/union'
import { updateObject, createReducer, deleteFromArray } from './reducerUtilities'

let initialState = { 
  typeFilters: [] 
}

const COLTYPES = {
  'boolean': 'True/False',
  'text': 'Text',
  'number': 'Number',
  'location': 'Location',
  'date': 'Date'
}

// define chartTypes
const LINE = {name: 'Line', key: 'line'}
const BAR = {name: 'Bar', key: 'bar'}
const COLUMN = {name: 'Column', key: 'bar'}
const AREA = {name: 'Area', key: 'area'}
const HISTOGRAM = {name: 'Histogram', key: 'histogram'}

function sortColumns (a, b) {
  if (a.label < b.label) {
    return -1
  }
  if (a.label > b.label) {
    return 1
  }
  return 0
}

function isSelectable (columns, col) {
  let colTypesAccepted = ['boolean', 'date']
  let regex = /(^(lat|lon)[a-z]*|^(x|y)$)/i
  let geoFields = regex.test(columns[col].key)
  // selectable if they are text or numeric columns that are categories and not geoFields OR is one of the type boolean, date and number
  let selectable = ((typeof columns[col].categories !== 'undefined') && !geoFields && ['text', 'number'].indexOf(columns[col].type) > -1) || colTypesAccepted.indexOf(columns[col].type) > -1
  return selectable
}

// selectors
export const getColumnDef = (state, column) => state && state.columns ? state.columns[column] : null

export const getUniqueColumnTypes = ({columns, typeFilters}, onlySelectables = false) => {
  if (!columns) return []

  typeFilters = typeFilters || []

  let uniqueColTypes = Object.keys(columns).reduce((acc, val) => {
    let index = acc.findIndex((el) => el.value === columns[val].type)
    let selectable = onlySelectables ? isSelectable(columns, val) : true

    if (index > -1) {
      acc[index].count += selectable ? 1 : 0
      return acc
    }

    if ((onlySelectables && selectable) || !onlySelectables) {
      return acc.concat({
        label: COLTYPES[columns[val].type],
        value: columns[val].type,
        count: 1,
        isSelected: typeFilters.indexOf(columns[val].type) > -1
      })
    }

    return acc
  }, [])

  return uniqueColTypes
}

// refactor this to pass in a filter callback to a single column filtering function
export const getGroupableColumns = (state, selectedColumn) => {
  let { columns } = state
  selectedColumn = selectedColumn || ''
  if (!columns) return []
  return Object.keys(columns).filter((col) => {
    return (columns[col].key !== selectedColumn && columns[col].categories && (columns[col].type === 'text' || (columns[col].type === 'number' && parseInt(columns[col].cardinality, 10) < 15 )))
  }).map((col) => {
    return {label: columns[col].name, value: columns[col].key}
  }).sort(sortColumns)
}

export const getSelectedField = (state, selectedColumn) => {
  let { columns } = state
  selectedColumn = selectedColumn || ''
  if (!columns) return []
  return Object.keys(columns).filter((col) => {
    return (col === selectedColumn)
  }).map((col) => {
    return {
      label: columns[col].name,
      value: columns[col].key,
      type: columns[col].type,
      description: columns[col].description,
      isCategory: (typeof columns[col].categories !== 'undefined' && columns[col].categories.length > 0),
      isSelected: (selectedColumn === columns[col].key)
    }
  }).sort(sortColumns)
}

export const getSelectableColumns = (state, selectedColumn, all = false, ignoreTypeFilters = false, exclude = []) => {
  let { columns, typeFilters, fieldNameFilter } = state
  if (!columns) return []
  return Object.keys(columns).filter((col) => {
    // override to return all columns, not just selectable
    if (all) return true

    let selectable = isSelectable(columns, col)
    if (state.showCols === 'hide' && col === selectedColumn) {
      return false
    }
    if (fieldNameFilter && columns[col].name.toLowerCase().indexOf(fieldNameFilter.toLowerCase()) === -1) {
      return false
    }
    if (exclude.indexOf(col) > -1) {
      return false
    }
    if (ignoreTypeFilters && selectable) {
      return true
    }
    if (selectable && typeFilters.length > 0 && typeFilters.indexOf(columns[col].type) > -1) {
      return true
    }
    if (selectable && typeFilters.length === 0) {
      return true
    }
    return false
  }).map((col) => {
    return {
      label: columns[col].name,
      value: columns[col].key,
      type: columns[col].type,
      description: columns[col].description,
      isCategory: (typeof columns[col].categories !== 'undefined' && columns[col].categories.length > 0),
      isSelected: (selectedColumn === columns[col].key),
      min: columns[col].min || null,
      max: columns[col].max || null
    }
  }).sort(sortColumns)
}

export const getSummableColumns = (state) => {
  let { columns } = state
  let colTypesAccepted = ['number']
  let regex = /(^(lat|lon|supervisor)[a-z]*|^(x|y)$)/i

  if (!columns) return []
  
  
  return Object.keys(columns).filter((col) => {
    return (parseFloat(columns[col].distinctness) < 0.95 && colTypesAccepted.indexOf(columns[col].type) > -1 && !regex.test(columns[col].name))
  }).map((col) => {
    return {label: columns[col].name, value: columns[col].key}
  }).sort(sortColumns)
}

export const getSupportedChartTypes = (state, selectedColumn) => {
  if (!selectedColumn) return []

  let { columns } = state
  let hasDate = Object.keys(columns).filter(key => {
    return columns[key].type === 'date'
  }).length > 0

  let column = columns[selectedColumn]
  if (column.type === 'text') return [BAR]
  if (column.type === 'date') return [LINE, COLUMN, AREA]
  if (column.type === 'number' && hasDate) return [BAR, HISTOGRAM, LINE, AREA]
  if (column.type === 'number') return [BAR, HISTOGRAM]
  if (column.type === 'boolean') return [BAR]

  return []
}

// case reducers
function initColumns (state, action) {
  return updateObject(state, {
    columns: action.response.columns,
    categoryColumns: action.response.categoryColumns
  })
}

function sortColumn (state, action) {
  return merge({}, state, {
    columns: {
      [action.key]: {
        sortDir: action.dir
      }
    }
  })
}

function loadColumnProperties (state, action) {
  action.response.categoryColumns = union([], state.categoryColumns, action.response.categoryColumns)
  return merge({}, state, action.response)
}

function filterColumnList (state, action) {
  let filterPayload
  if (action.payload.target !== 'columnProps') {
    return state
  }

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

function setHideShow (state, action) {
  if (action.payload.target !== 'columnProps') {
    return state
  }
  return updateObject(state, {
    showCols: action.payload.showCols
  })
}

function setDefaultHideShow (state, action) {
  if (action.payload.target !== 'columnProps') {
    return state
  }
  return updateObject(state, {
    showCols: action.payload.showCols
  })
}

function resetState (state, action) {
  if (action.type === ActionTypes.METADATA_REQUEST || action.payload === 'columnProps') {
    return initialState
  }
  return state
}

const columnsReducer = createReducer(initialState, {
  [ActionTypes.COLUMNS_SUCCESS]: initColumns, 
  [ActionTypes.COLPROPS_SUCCESS]: loadColumnProperties,
  [ActionTypes.FILTER_COLUMN_LIST]: filterColumnList,
  [ActionTypes.SORT_COLUMN_LIST]: sortColumnList,
  [ActionTypes.SET_HIDE_SHOW]: setHideShow,
  [ActionTypes.SET_DEFAULT_HIDE_SHOW]: setDefaultHideShow,
  [ActionTypes.METADATA_REQUEST]: resetState,
  [ActionTypes.RESET_STATE]: resetState,
  [ActionTypes.SORT_COLUMN]: sortColumn
})
export default columnsReducer
