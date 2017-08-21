
//import titleize from 'titleize'

const API_ROOT = 'http://metadatasf.tk/api/v1/'
const geoTypeMappings = {
  'geometry: line': 'geometry-line',
  'geometry: point': 'geometry-point',
  'geometry: polygon': 'geometry-polygon',
  'geometry: multiline': 'geometry-multi-line',
  'geometry: multipolygon': 'geometry-multi-polygon',
  'geometry: multipoint': 'geometry-multi-point'
}

export const EndpointsSF = {
  METADATA: endpointMetadata,
  COLUMNS: endpointColumns,
  RELATEDDATASETS: endpointRelatedDatasets
}

function endpointMetadata (id) {
  return API_ROOT + `datasetdetails/${id}`
}

function endpointColumns (id) {
  return API_ROOT + `fielddetails/${id}`
}
function endpointRelatedDatasets (id) {
  return API_ROOT + `relateddatasets/${id}`
}

export const TransformsSF = {
  METADATA: transformMetadata,
  COLUMNS: transformColumns,
  RELATEDDATASETS: transformRelatedDatasets
}


function transformMetadata (json) {
  // Set default rowLabel
  let metadata = json[0]
  metadata.rowLabel = metadata.rowLabel || 'Row'
  metadata.keywords = metadata.keywords !== null ? metadata.keywords.split(',') : []
  metadata.isFetching = false
  metadata.fromSearch = false
  return metadata
}


function transformColumns (json) {
  let result = {}
  let geoTypeMappingKeys = Object.keys(geoTypeMappings)
  let columns = json.reduce(function(map, obj) {
    if(geoTypeMappingKeys.includes(obj.type)){
      obj.type = geoTypeMappings[obj.type]
    }
    map[obj.key] = obj
    return map
  }, {})
  result['columns'] = columns
  result.categoryColumns = json.map(function(item){
    let key
    if(item.isCategory && item.type.indexOf('geometry') === -1) {
      key = item.key
    }
    return key
  }).filter(n => n)

  result.textColumns = json.map(function(item){
    let key
    if(item.type === 'text'){
      key =  item.key
    }
    return key
  }).filter(n => n)
  return result
}

function getRelatedDeparts(json){
  let depts = {}
  let sortedByDatasetName = json.sort(function(a, b){
    if(a.dataset_name < b.dataset_name) return -1
    if(a.dataset_name > b.dataset_name) return 1
    return 0
  })
  sortedByDatasetName.forEach(function(item){
    //item.dataset_name = titleize(item.dataset_name)
    item.description = item.description ? item.description.substring(0,250) + ' ...' : null
    // item.department = titleize(item.department)
    if(typeof item.keywords !== 'undefined'){
      item.keywords = item.keywords.split(", ")
      item.keywords = item.keywords.join(", ")
    }

    if(Object.keys(depts).indexOf(item.department) === -1){
      depts[item.department] = [item]
    }else{
      let linksList = depts[item.department]
      depts[item.department] = linksList.concat([item])
    }
  })
  let sortedDeptsList = Object.keys(depts).sort(function(a, b) {
    return depts[depts[a].length] - depts[depts[b].length]
  })
  let deptsSorted =  []

  sortedDeptsList.forEach(function(dept){
    console.log(depts)
    let deptItem = {'dept': dept, 'links': depts[dept]}
    deptsSorted.push(deptItem)
  })
  return deptsSorted
}

function transformRelatedDatasets (json) {
  let relatedDatasetCnt = String(json.length)
  json = getRelatedDeparts(json)
  return {
    'relatedDatasetCnt': relatedDatasetCnt,
    'relatedDatasets': json,
  }
}
