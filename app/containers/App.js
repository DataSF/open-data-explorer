import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer/Footer'

const pages = [
  {
    route: '/catalog',
    title: 'Data Catalog'
  },
  {
    route: '/about',
    title: 'About'
  }]

const FullLayout = (props) => (
  <div className='FullLayout-wrapper'>
    <Navigation pages={pages} location={props.location} />
    <div className={'content-wrapper'}>
      {props.children}
    </div>
  </div>
  )

const EmbedLayout = (props) => (
  <div className='EmbedLayout-wrapper'>
    {props.children}
  </div>
  )

class App extends Component {
  render () {
    let { children } = this.props
    let isEmbed = /\/e\//.test(this.props.location.pathname)
    return (
      <div className='App'>
        { isEmbed
        ? <EmbedLayout children={children} /> : <FullLayout children={children} location={this.props.location} />
        }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default connect()(App)
