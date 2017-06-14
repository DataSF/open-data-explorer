

const API_ROOT = 'http://metadatasf.tk/api/v1/'
const geoTypeMappings = {
  'geometry: line': 'geometryLine',
  'geometry: point': 'geometryPoint',
  'geometry: polygon': 'geometryPolygon',
  'geometry: multiline': 'geometryMultiline',
  'geometry: multipolygon': 'geometryMultipolygon',
  'geometry: multipoint': 'geometryMultipoint',
}


export const EndpointsSF = {
  METADATA: endpointMetadata,
  COLUMNS: endpointColumns
}

function endpointMetadata (id) {
  return API_ROOT + `datasetdetails/${id}`
}

function endpointColumns (id) {
  return API_ROOT + `fielddetails/${id}`
 }

export const TransformsSF = {
  METADATA: transformMetadata,
  COLUMNS: transformColumns
}


function transformMetadata (json) {
  let metadata = json[0]
  return metadata
}


function transformColumns (json) {
  let result = {}
  let geoTypeMappingKeys = Object.keys(geoTypeMappings)
  console.log(geoTypeMappingKeys)
  let columns = json.reduce(function(map, obj) {
    
    // console.log(obj)
    if(geoTypeMappingKeys.includes(obj.type)){
      obj.type = geoTypeMappings[obj.type]
    }
    map[obj.key] = obj
    return map
  }, {})
  result['columns'] = columns
  result.categoryColumns = json.map(function(item){
    let key
    if(item.isCategory){
      key =  item.key
    }
    return key
  }).filter(n => n)
  return result
} 