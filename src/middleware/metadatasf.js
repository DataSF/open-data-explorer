

const API_ROOT = 'http://metadatasf.tk/api/v1/'

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
  let columns = json.reduce(function(map, obj) {
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