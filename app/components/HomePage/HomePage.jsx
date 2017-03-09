import './_HomePage.scss'

import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import AutoSuggestSearch from '../../containers/AutoSuggestSearch'

class HomePage extends Component {

  constructor (props) {
    super(props)
    // temporary state with component, this will graduate later after we refactor search altogether
    this.state = {
      text: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleSearch (e) {
    e.preventDefault()
    let text = this.state.text.trim()

    if (!text) {
      return
    }

    hashHistory.push('/catalog/?search=' + text)
  }

  handleTextChange (e) {
    console.log(e.target.value)
    this.setState({text: e.target.value})
  }

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
