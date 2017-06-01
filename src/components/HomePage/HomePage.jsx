import './@HomePage.css'

import React, { Component } from 'react'
import AutoSuggestSearch from '../../containers/AutoSuggestSearch'

class HomePage extends Component {
  render () {
    return (
      <div id='main-container'>
        <section id='jumbo-search' className={'jumbotron jumbotron-default homepage'}>
          <div className={'container'}>
            <h1>Find the data you need</h1>
            <p>Search hundreds of datasets from the City and County of San Francisco. Or browse on the <a href='#/catalog' className={'ext-sf-opendata'}>data catalog</a></p>
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
