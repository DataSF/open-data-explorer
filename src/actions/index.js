import { CALL_API } from '../middleware'
//import { Endpoints, Transforms, shouldRunColumnStats } from '../middleware/socrata'

import { Endpoints, Transforms } from '../middleware/socrata'
import { EndpointsSF, TransformsSF } from '../middleware/metadatasf'

import {isColTypeTest} from '../helpers'
export const METADATA_REQUEST = 'METADATA_REQUEST'
export const METADATA_SUCCESS = 'METADATA_SUCCESS'
export const METADATA_FAILURE = 'METADATA_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchMetadata (id) {
  return {
    [CALL_API]: {
      types: [METADATA_REQUEST, METADATA_SUCCESS, METADATA_FAILURE],
      endpoint: EndpointsSF.METADATA(id),
      transform: TransformsSF.METADATA
    }
  }
}

export const COLUMNS_REQUEST = 'COLUMNS_REQUEST'
export const COLUMNS_SUCCESS = 'COLUMNS_SUCCESS'
export const COLUMNS_FAILURE = 'COLUMNS_FAILURE'

function fetchColumns (id) {
  return {
    [CALL_API]: {
      types: [COLUMNS_REQUEST, COLUMNS_SUCCESS, COLUMNS_FAILURE],
      endpoint: EndpointsSF.COLUMNS(id),
      transform: TransformsSF.COLUMNS
    }
  }
}

export const COLPROPS_REQUEST = 'COLPROPS_REQUEST'
export const COLPROPS_SUCCESS = 'COLPROPS_SUCCESS'
export const COLPROPS_FAILURE = 'COLPROPS_FAILURE'

function fetchColumnProps (id, key) {
  return {
    [CALL_API]: {
      types: [COLPROPS_REQUEST, COLPROPS_SUCCESS, COLPROPS_FAILURE],
      endpoint: Endpoints.COLPROPS(id, key),
      transform: Transforms.COLPROPS,
      params: {
        key: key
      }
    }
  }
}

// Bootstraps the loading of metadata assets related to a dataset. We have to chain some of these because of the way Socrata handles various viewTypes.
// 1. Load metadata and columns run asynchronously
// 2. Then the migration ID is looked up so we know where to run queries against, and a query to count rows is issued
// 3. Last, we run some stats against certain columns to use in the interface

export function loadMetadata (id) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchMetadata(id)),
      dispatch(fetchColumns(id)),
      dispatch(loadRelatedDatasets(id))
      ]).then(() => {
        return Promise.all([
          dispatch(loadColumnProps()),
          dispatch(loadTable())
        ])
      })
    }
  }

/*export function loadMetadata (id) {
  return (dispatch, getState) => {
    return dispatch(fetchMetadata(id)).then(() => {
      //let dataId = getState().metadata.dataId
      return Promise.all([
        dispatch(fetchColumns(id)),
        // dispatch(fetchMigrationId(id)),
        //  dispatch(countRows(dataId))
      ]).then(() => {
        return dispatch(loadColumnProps())
      })
    })
  }
}*/

export function loadFieldProps () {
  return (dispatch, getState) => {
    // let id = getState().metadata.migrationId ? getState().metadata.migrationId : getState().metadata.id
    let id = getState().metadata.dataId
    let promises = []
    //let columns = getState().columnProps.columns
    let categoryColumns = getState().columnProps.categoryColumns
    // let textColumns = getState().FieldProps.textColumns
    for (let i =0; i < categoryColumns.length; i++) {
      promises.push(dispatch(fetchColumnProps(id, categoryColumns[i])))
    }
    return Promise.all(promises)
  }
}

export function loadColumnProps () {
  return (dispatch, getState) => {
    // let id = getState().metadata.migrationId ? getState().metadata.migrationId : getState().metadata.id
    let id = getState().metadata.dataId
    let promises = []
    //let columns = getState().columnProps.columns
    let categoryColumns = getState().columnProps.categoryColumns
    for (let i =0; i < categoryColumns.length; i++) {
      promises.push(dispatch(fetchColumnProps(id, categoryColumns[i])))
    }
    return Promise.all(promises)
  }
}

export const DATA_REQUEST = 'DATA_REQUEST'
export const DATA_SUCCESS = 'DATA_SUCCESS'
export const DATA_FAILURE = 'DATA_FAILURE'
export const FIELD_DATA_REQUEST = 'FIELD_DATA_REQUEST'
export const FIELD_DATA_SUCCESS = 'FIELD_DATA_SUCCESS'
export const FIELD_DATA_FAILURE = 'FIELD_DATA_FAILURE'

function fetchData (state, isForTable = false) {
  let endpoint
  let transform
  if (!isForTable) {
    endpoint = Endpoints.QUERY(state)
    transform = Transforms.QUERY
  } else {
    endpoint = Endpoints.TABLEQUERY(state)
    transform = Transforms.TABLEQUERY
  }
  return {
    [CALL_API]: {
      types: [DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE],
      endpoint: endpoint,
      transform: transform
    }
  }
}


function fetchDataTextFieldCategories (state) {
  let endpoint
  let transform
  //console.log("(*****state before fetch on categories*****")
  //console.log(state)
  ///console.log(state.fieldDetailsProps.selectedField)
  if(state.fieldDetailsProps.selectedField){
    endpoint = Endpoints.QUERYTEXTCATEGORIES(state)
    transform = Transforms.QUERYTEXTCATEGORIES
    return {
      [CALL_API]: {
        types: [FIELD_DATA_REQUEST, FIELD_DATA_SUCCESS, FIELD_DATA_FAILURE],
        endpoint: endpoint,
        transform: transform
      }
    }
  }
  return {
    type: FIELD_DATA_SUCCESS,
    payload: {}
  }
}

export const LOAD_TABLE = 'LOAD_TABLE'

export function loadTable () {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_TABLE
    })
    dispatch(fetchData(getState(), true))
  }
}

// query parameter related actions - these might be able to be collapsed to a single action creator that updates the query params - groupby, dateby, column selection
export const SELECT_COLUMN = 'SELECT_COLUMN'
export const CHANGE_DATEBY = 'CHANGE_DATEBY'
export const CHANGE_ROLLUPBY = 'CHANGE_ROLLUPBY'
export const GROUP_BY = 'GROUP_BY'
export const SUM_BY = 'SUM_BY'
export const SORT_COLUMN = 'SORT_COLUMN' // for sorting the table
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const FILTER_COLUMN_LIST = 'FILTER_COLUMN_LIST'
export const SORT_COLUMN_LIST = 'SORT_COLUMN_LIST' // for sorting the list of columns on details or within column picker
export const SET_HIDE_SHOW = 'SET_HIDE_SHOW'
export const SET_DEFAULT_HIDE_SHOW = 'SET_DEFAULT_HIDE_SHOW'
export const SET_DEFAULT_CHARTTYPE = 'SET_DEFAULT_CHARTTYPE'

export function filterColumnList (key, item, target) {
  return {
    type: FILTER_COLUMN_LIST,
    payload: {
      key,
      item,
      target
    }
  }
}

export function selectColumn (column) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_COLUMN,
      payload: column})
    dispatch(setHideShow(false, 'columnProps'))
    if (column !== null) {
      dispatch(fetchData(getState()))
      dispatch(setDefaultChartType(column))
    } else if (column === null) {      
      dispatch(resetState('query'))
    }
  }
}

export function selectField (column) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_FIELD,
      payload: column})
    dispatch(fetchDataTextFieldCategories(getState()))
    dispatch(setHideShow(false, 'fieldDetailsProps'))
  }
}

export function setHideShow (showCols, target) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_HIDE_SHOW,
      payload: {'showCols': showCols, 'target': target}
    })
  }
}

export function setDefaultChartType (column) {
  return (dispatch, getState) => {
    function getDefaultChartType () {
      let selectedColumnDef = getState().columnProps.columns[column]
      let isDateCol = isColTypeTest(selectedColumnDef, 'date')
      let isNumericCol = isColTypeTest(selectedColumnDef, 'number')
      let chartType
      if (isDateCol) {
        chartType = 'line'
      } else if (isNumericCol) {
        chartType = 'histogram'
      } else {
        chartType = 'bar'
      }
      return chartType
    }
    dispatch({
      type: SET_DEFAULT_CHARTTYPE,
      chartType: getDefaultChartType()
    })
  }
}

export function changeDateBy (dateBy) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_DATEBY,
      payload: dateBy})
    dispatch(fetchData(getState()))
  }
}

export function changeRollupBy (rollupBy) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_ROLLUPBY,
      payload: rollupBy})
    dispatch(fetchData(getState()))
  }
}

export function groupBy (key) {
  return (dispatch, getState) => {
    dispatch({
      type: GROUP_BY,
      payload: key})
    dispatch(fetchData(getState()))
  }
}

export function sumBy (key) {
  return (dispatch, getState) => {
    dispatch({
      type: SUM_BY,
      payload: key})
    dispatch(fetchData(getState()))
  }
}

export function sortColumnList (sort) {
  return {
    type: SORT_COLUMN_LIST,
    payload: sort
  }
}

export function sortColumn (key, dir) {
  return (dispatch, getState) => {
    dispatch({
      type: SORT_COLUMN,
      key,
      dir})
    dispatch(fetchData(getState(), true))
  }
}

export function updatePage (page) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PAGE,
      page
    })
    dispatch(fetchData(getState(), true))
  }
}

export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const APPLY_FILTER = 'APPLY_FILTER'
export const APPLY_CHART_TYPE = 'APPLY_CHART_TYPE'
export const UPDATE_FROM_QS = 'UPDATE_FROM_QS'
export const QS_FAILURE = 'QS_FAILURE'
export const RESET_STATE = 'RESET_STATE'
export function addFilter (key) {
  return {
    type: ADD_FILTER,
    payload: key}
}

export function applyChartType (chartType) {
  return {
    type: APPLY_CHART_TYPE,
    chartType}
}

export function removeFilter (key) {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FILTER,
      payload: key})
    dispatch(fetchData(getState()))
  }
}

export function updateFilter (key, options) {
  return {
    type: UPDATE_FILTER,
    payload: {
      key,
      options
    }
  }
}

export function resetState (target) {
  return {
    type: RESET_STATE,
    payload: target
  }
}

export function applyFilter (key, options) {
  return (dispatch, getState) => {
    dispatch(updateFilter(key, options))
    dispatch(fetchData(getState()))
  }
}

const parseQueryString = (q) => {
  let payload
  let error
  if (typeof q === 'string') {
    try {
      payload = JSON.parse(q)
    } catch (e) {
      error = true
    }
  } else {
    error = true
  }

  if (error) return Promise.reject(new Error('This URL does not point to a valid visual. Please check the URL.'))
  return Promise.resolve(payload)
}

export const loadQueryStateFromString = (q) => (dispatch, getState) => {
  return parseQueryString(q).then(
    response => {
      dispatch({
        type: UPDATE_FROM_QS,
        payload: response
      })
      dispatch(fetchData(getState()))
    },
    error => {
      dispatch({
        type: QS_FAILURE,
        message: error.message || 'Something bad happened',
        error: true
      })
    })
}

export const UPDATE_SEARCH = 'UPDATE_SEARCH'
export const SELECT_SEARCH_RECORD = 'SELECT_SEARCH_RECORD'
export const SELECT_FIELD = 'SELECT_FIELD'
export const SET_SELECTED_FIELD_DETAILS = 'SET_SELECTED_FIELD_DETAILS'


export function updateSearch (searchState) {
  return {
    type: UPDATE_SEARCH,
    payload: searchState
  }
}

export function selectSearchRecord (record) {
  return {
    type: SELECT_SEARCH_RECORD,
    payload: record
  }
}

export const SHOW_HIDE_MODAL = 'SHOW_HIDE_MODAL'

export function showHideModal (target) {
  return {
    type: SHOW_HIDE_MODAL,
    payload: target
  }
}

export const RELATEDDATASET_REQUEST = 'RELATEDDATASET_REQUEST'
export const RELATEDDATASET_SUCCESS = 'RELATEDDATASET_SUCCESS'
export const RELATEDDATASET_FAILURE = 'RELATEDDATASET_FAILURE'

// Fetches a related datasets from the metadata API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRelatedDatasets (id) {
  // console.log("** fetching related datasets***")
  // console.log(fbf)
  // console.log("********")
  return {
    [CALL_API]: {
      types: [RELATEDDATASET_REQUEST, RELATEDDATASET_SUCCESS, RELATEDDATASET_FAILURE],
      endpoint: EndpointsSF.RELATEDDATASETS(id),
      transform: TransformsSF.RELATEDDATASETS
    }
  }
}

export function loadRelatedDatasets (id) {
  return (dispatch, getState) => {
    return dispatch(fetchRelatedDatasets(id))
  }
}

