import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import union from 'lodash/union'
import { updateObject, createReducer, deleteFromArray } from './reducerUtilities'

const COLTYPES = {
  'boolean': 'True/False',
  'text': 'Text',
  'number': 'Number',
  'location': 'Location',
  'date': 'Date', 
  'geometry-line': 'Geometry: Line',
  'geometry-point': 'Geometry: Point',
  'geometry-polygon': 'Geometry: Polygon',
  'geometry-multi-line': 'Geometry: Multiline',
  'geometry-multi-polygon': 'Geometry: Multipolygon',
  'geometry-multi-point': 'Geometry: Multipoint',
}

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
  let selectable = (!columns[col].unique)
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

export const getSelectedFieldDetails = (state, selectedColumn) => {
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

export const getSelectableColumns = (state, selectedColumn, all = false) => {
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
    if (selectable && typeFilters.length > 0 && typeFilters.indexOf(columns[col].type) > -1) {
      return true
    } else if (selectable && typeFilters.length === 0) {
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


// case reducers
function initColumns (state, action) {
  return updateObject(state, {
    columns: action.response.columns,
    categoryColumns: action.response.categoryColumns
  })
}



function loadColumnProperties (state, action) {
  action.response.categoryColumns = union([], state.categoryColumns, action.response.categoryColumns)
  return merge({}, state, action.response)
}

function filterColumnList (state, action) {
  let filterPayload
  if (action.payload.target !== 'fieldDetailsProps') {
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
  console.log("*** in here****")
  console.log(action)
  if (action.payload.target !== 'fieldDetailsProps') {
    return state
  }
  return updateObject(state, {
    showCols: action.payload.showCols
  })
}

function setSelectField(state, action) {
  console.log("in here selected")
  return updateObject(state, {
    selectedField: action.payload
  })

}

function setDefaultHideShow (state, action) {
  if (action.payload.target !== 'fieldDetailsProps') {
    return state
  }
  if (action.payload.target === 'fieldDetailsProps') {
    return updateObject(state, {
      showCols: action.payload.showCols
    })
  }
}

function resetState (state, action) {
  if (action.payload.target !== 'fieldDetailsProps') {
    return state
  }
  return updateObject(state, {})
}



const fieldsReducer = createReducer({ typeFilters: [] }, {
  [ActionTypes.COLUMNS_SUCCESS]: initColumns, 
  [ActionTypes.COLPROPS_SUCCESS]: loadColumnProperties,
  [ActionTypes.FILTER_COLUMN_LIST]: filterColumnList,
  [ActionTypes.SORT_COLUMN_LIST]: sortColumnList,
  [ActionTypes.SET_HIDE_SHOW]: setHideShow,
  [ActionTypes.SET_DEFAULT_HIDE_SHOW]: setDefaultHideShow,
  [ActionTypes.SELECT_FIELD]: setSelectField,
  [ActionTypes.RESET_STATE]: resetState
})
export default fieldsReducer
