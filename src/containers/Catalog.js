import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InstantSearch } from 'react-instantsearch/dom'
import Search from '../components/Catalog'
import isEqual from 'lodash/isEqual'
import {withRouter} from 'react-router'
import qs from 'qs'
import { updateSearch, clearSearch } from '../actions'

class Catalog extends Component {

  constructor (props) {
    super(props)

    // We set this and update it to deal with an issue where onSearchStateChange is called as the component is
    // unmounting. This was causing the component to get trapped and remounted because the state would get updated
    // before the location changed
    this.unmounting = false
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(qs.parse(this.props.location.query), qs.parse(nextProps.location.query))) {
      this.props.onSearchStateChange({searchState: {...qs.parse(nextProps.location.query)}})
    }
  }

  componentWillUnmount () {
    this.unmounting = true
  }

  componentWillMount () {
    this.unmounting = false
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props.searchState, nextProps.searchState)
  }

  onSearchStateChange (nextSearchState) {
    const THRESHOLD = 700
    const newPush = Date.now()
    this.props.onSearchStateChange({lastPush: newPush})
    if (this.props.lastPush && newPush - this.props.lastPush <= THRESHOLD) {
      this.props.router.replace(nextSearchState ? `${this.props.location.pathname}?${qs.stringify(nextSearchState)}` : '')
      this.props.onSearchStateChange({searchState: nextSearchState})
    } else if (!this.unmounting) {
      this.props.router.push(nextSearchState ? `${this.props.location.pathname}?${qs.stringify(nextSearchState)}` : '')
    }
  }

  render () {
    return (
      <InstantSearch
        appId='N6IVMSP2S4'
        apiKey='3bd0fc517f80911bf21045747262a1bd'
        indexName='dev_dataset_search'
        searchState={this.props.searchState}
        onSearchStateChange={this.onSearchStateChange.bind(this)}
        createURL={state => `?${qs.stringify(this.props.searchState)}`}
      >
        <Search clearSearch={this.props.clearSearch} />
      </InstantSearch>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchState: state.search.searchState,
    lastPush: state.search.lastPush,
    router: ownProps.router,
    location: ownProps.location
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSearchStateChange: (searchState) => dispatch(updateSearch(searchState)),
    clearSearch: () => dispatch(clearSearch())
  }
}

const ConnectedCatalog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

export default withRouter(ConnectedCatalog)
