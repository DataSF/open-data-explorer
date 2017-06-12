import './styles/bootstrap-explorer.css'
import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import airbrakeJs from 'airbrake-js'
window.airbrake = new airbrakeJs({projectId: 129600, projectKey: 'b8fe4ddb8be71382afa569e93c9b0d87'}) // eslint-disable-line

const initialState = {
  metadata: {
    query: {
      dateBy: 'year',
      rollupBy: 'other'
    },
    table: {
      tablePage: 0
    }
  },
  table: {
    tablePage: 0
  },
  query: {
    groupKeys: []
  }
}
const store = configureStore(initialState)
const history = syncHistoryWithStore(hashHistory, store)
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
