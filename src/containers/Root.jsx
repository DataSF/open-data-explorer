import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router } from 'react-router'
import reactGA from 'react-ga'

reactGA.initialize('UA-53975719-6')

function logPageView() {
  reactGA.set({ page: window.location.pathname + window.location.search });
  reactGA.pageview(window.location.pathname + window.location.search);
}

export default class Root extends Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} onUpdate={logPageView} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
