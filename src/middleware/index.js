import fetch from 'isomorphic-fetch'

// Fetches an API response and normalizes the result JSON according to a transformation which can involve a normalized schema.
// This makes the shape of API data predictable
function callApi (endpoint, transform, state, params) {
  // const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(endpoint)
    .then((response) => response.json().then((json) => ({json, response}))
  ).then(({ json, response }) => {
    let { ok, status } = response
    if (!ok) {
      json.status = status
      if (status >= 500) {
        json.message = 'Oops! Looks like the Socrata servers are unreachable, responded with: ' + json.message + '. Please check http://status.socrata.com and try again later.'
      } else if (status < 500) {
        json.message = 'Oops! The server responded with an error: ' + json.status + ' ' + json.message + '. Code: ' + json.code
      }
      return Promise.reject(json)
    }

    const transformed = transform(json, state, params)

    return Object.assign({},
      transformed
    )
  })
}

export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  
  let { endpoint } = callAPI
  if (typeof endpoint === 'undefined') {
    return next(action)
  }
  const { types, transform, params } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, transform, store.getState(), params).then(
    (response) => next(actionWith({
      response,
      type: successType
    })),
    (error) => {
      next(actionWith({
        type: failureType,
        status: error.status,
        error: true,
        message: error.message || 'Something bad happened'
      }))
    }
  )
}
