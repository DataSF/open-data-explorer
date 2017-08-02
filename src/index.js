import './styles/bootstrap-explorer.css'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store'

const initialState = {
  query: {
    groupKeys: []
  }
}
const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
