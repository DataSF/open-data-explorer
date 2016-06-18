import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'

const pages = [
  {
    route: '',
    title: 'Home'
  },
  {
    route: 'catalog',
    title: 'Data Catalog'
  }]

class App extends Component {
  render () {
    const { children } = this.props
    return (
      <div>
        <Navigation pages={pages} />
        {children}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default connect()(App)
