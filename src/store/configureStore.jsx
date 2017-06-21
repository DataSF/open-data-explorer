import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import api from '../middleware'
import airbrakeMiddleware from '../middleware/airbrake'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore (initialState) {
  let middleware = [thunkMiddleware, api]

  if (process.env.NODE_ENV === 'production') {
    let server = process.env.REACT_APP_CONTEXT || 'unset'
    middleware = [airbrakeMiddleware({
      projectId: 129600,
      projectKey: 'b8fe4ddb8be71382afa569e93c9b0d87'
    }, {
      context: { environment: server }
    }), ...middleware]
  }

  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger()]
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
