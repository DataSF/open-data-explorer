import './@HomePage.css'

import React, { Component } from 'react'
import AutoSuggestSearch from '../../containers/AutoSuggestSearch'
import { Link } from 'react-router'
import { setDocumentTitle } from '../../helpers'

class HomePage extends Component {
  render () {
    setDocumentTitle(false)
    return (
      <div id='main-container'>
        <section id='jumbo-search' className={'jumbotron jumbotron-default homepage'}>
          <div className={'container'}>
            <h1>Find the data you need</h1>
            <p>Search hundreds of datasets from the City and County of San Francisco. Or browse on the <Link to={'/catalog'}>data catalog</Link></p>
            <div className={'row'}>
              <div className={'col-md-12 HomePage__search'}>
                <AutoSuggestSearch />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default HomePage
