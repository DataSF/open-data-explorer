import './@containers.css'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {InstantSearch, Configure} from 'react-instantsearch/dom'
import {createConnector} from 'react-instantsearch'
import {connectSearchBox} from 'react-instantsearch/connectors'
import Autosuggest from 'react-autosuggest'
import { browserHistory } from 'react-router'
import slugify from 'underscore.string/slugify'
import { updateSearch, selectSearchRecord } from '../actions'

class AutoSuggestSearch extends Component {
  render () {
    return (
      <InstantSearch
        appId='N6IVMSP2S4'
        apiKey='3bd0fc517f80911bf21045747262a1bd'
        indexName='dev_dataset_search'
        searchState={this.props.searchState}
      >
        <div>
          <Configure hitsPerPage={5} />
          <VirtualSearchBox />
          <ConnectedAutoComplete 
            attributes={[]} 
            className={this.props.className} 
            onSearchStateChange={this.props.updateSearch} 
            onSelectRecord={this.props.onSelectRecord} />
        </div>
      </InstantSearch>
    )
  }
}

const VirtualSearchBox = connectSearchBox(() => null)

const connectAutoComplete = createConnector({
  displayName: 'AutoComplete',
  getProvidedProps (props, state, search) {
    const hits = search.results ? search.results.hits : []
    const isInputBlank = state.query ? state.query.trim() === '' : true
    const noSuggestions = !isInputBlank && hits.length === 0
    return {
      hits, noSuggestions, query: state.query !== undefined ? state.query : ''
    }
  },
  // we update the state of <InstantSearch/> to trigger a new search.
  refine (props, searchState, nextQuery) {
    let updatedState = {
      hideSuggestions: nextQuery.hideSuggestions,
      searchState: {
        ...searchState,
        query: nextQuery.query
      }
    }
    return props.onSearchStateChange(updatedState)
  }
})

const renderSuggestionsContainer = (noSuggestions, autosuggestComponent, { containerProps, children, query }) => {
  if (noSuggestions) {
    containerProps = {...containerProps}
    containerProps.className = containerProps.className + ' react-autosuggest__suggestions-container--open'
    if (autosuggestComponent) {
      autosuggestComponent.input.classList.add('react-autosuggest__input--open')
    }
  }

  return (
    <div {...containerProps}>
      {children}
      {noSuggestions
      ? <div className={'AutoSuggestSearch__no-results'}>
          No results found based on your search term.
        </div>
      : <div className='AutoSuggestSearch__footer'>
          Press 'enter' to search entire data catalog for <strong>{query}</strong>
        </div>
      }
  </div>
)}

class AutoComplete extends Component {
  render () {
    return <form
      className={this.props.className}
      onSubmit={(event) => {
        event.preventDefault()
        if (!this.refs.autosuggest.justSelectedSuggestion) {
          browserHistory.push({
            pathname: '/catalog',
            query: {
              query: this.refs.autosuggest.input.value
            }
          })
        }
      }} >
      <Autosuggest
        ref='autosuggest'
        suggestions={this.props.hits}
        onSuggestionsFetchRequested={({value}) => this.props.refine({query: value, hideSuggestions: false})}
        onSuggestionsClearRequested={() => {
          if (this.refs.autosuggest.input.value.length === 0) {
            this.props.refine({hideSuggestions: true, query: ''})
          } else {
            this.props.refine({hideSuggestions: true})
          }
        }}
        getSuggestionValue={hit => hit.name}
        renderSuggestion={hit =>
          <div>
            <div>{hit.name}</div>
          </div>
        }
        inputProps={{
          placeholder: 'Search for datasets...',
          value: this.props.query,
          onChange: () => {}
        }}
        onSuggestionSelected={(event, {suggestion, suggestionIndex}) => {
          let link = '/' + slugify(suggestion.category) + '/' + slugify(suggestion.name) + '/' + suggestion.objectID
          this.refs.autosuggest.input.value = ''
          this.props.refine({query: '', hideSuggestions: true})
          this.props.onSelectRecord(suggestion)
          browserHistory.push(link)
        }}
        renderSuggestionsContainer={renderSuggestionsContainer.bind(this, this.props.noSuggestions, this.refs.autosuggest)}
      />
    </form>
  }
}

AutoComplete.propTypes = {
  refine: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

const ConnectedAutoComplete = connectAutoComplete(AutoComplete)

const mapStateToProps = (state, ownProps) => {
  return {
    searchState: state.search.searchState,
    className: ownProps.className
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateSearch: (searchState) => dispatch(updateSearch(searchState)),
    onSelectRecord: (record) => dispatch(selectSearchRecord(record))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(AutoSuggestSearch)
