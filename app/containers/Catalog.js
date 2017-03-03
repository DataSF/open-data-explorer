import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InstantSearch } from 'react-instantsearch/dom'
import Search from '../components/Catalog'
import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'

class Catalog extends Component {
  constructor (props) {
    super(props)
    this.state = {searchState: {}}
  }

  componentWillMount () {
    this.setState({
      searchState: {
        query: this.props.searchTerm
      }
    })
  }

  componentWillReceiveProps () {
    let newState = merge({}, this.state, {
      query: this.props.searchTerm,
      page: this.props.page
    })

    this.setState(newState)

    console.log(this.state)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.state.searchState, nextState.searchState)
  }

  onSearchStateChange (nextSearchState) {
    const newPush = Date.now()
    this.setState({lastPush: newPush, searchState: nextSearchState})
  }

  render () {
    return (
      <InstantSearch
        appId='N6IVMSP2S4'
        apiKey='3bd0fc517f80911bf21045747262a1bd'
        indexName='dev_dataset_search'
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange.bind(this)}
      >
        <Search />
      </InstantSearch>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchTerm: ownProps.location.query.search || '',
    page: ownProps.params.page || 1
  }
}

export default connect(
  mapStateToProps
)(Catalog)
