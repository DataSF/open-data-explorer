import './@Catalog.css'

import React from 'react'
import { Hits, SearchBox, RefinementList, CurrentRefinements, ClearAll, Pagination, Panel, Highlight } from 'react-instantsearch/dom'
import { connectStats } from 'react-instantsearch/connectors'
import { Grid, Row, Col, Panel as BSPanel } from 'react-bootstrap'
import orderBy from 'lodash/orderBy'
import { Link } from 'react-router'
import slugify from 'underscore.string/slugify'
import moment from 'moment'

const CustomStats = ({nbHits}) => <span className={'ais-Stats__root clearfix'}>{nbHits} results found.</span>

const ConnectedStats = connectStats(CustomStats)

const Record = (clearSearch, {hit}) => (
  <BSPanel 
    header={<Link to={`${'/' + slugify(hit.category) + '/' + slugify(hit.name) + '/' + hit.systemID}`} onClick={clearSearch}>
        <Highlight attributeName='name' hit={hit} tagName='mark'/>
      </Link>} 
    className='Catalog__record' 
    bsStyle='primary'>
    <div className={'Catalog__record-meta clearfix'}>
      <div className={'Catalog__record-meta-title'}>Data updated</div>
      <div className={'Catalog__record-meta-value'}>{moment(hit.rowsUpdatedAt * 1000).fromNow()}</div>
      <div className={'Catalog__record-meta-title'}>Target update schedule</div>
      <div className={'Catalog__record-meta-value'}>{hit.publishingFrequency}</div>
      <div className={'Catalog__record-meta-title'}>Category</div>
      <div className={'Catalog__record-meta-value'}><Highlight attributeName='category' hit={hit} tagName='mark'/></div>
    </div>
    <div className={'Catalog__record-description clearfix'}>
      <p className={'Catalog__record-description-text'}>
        <Highlight attributeName='description' hit={hit} tagName='mark'/>
      </p>
      {hit.tags ? (
        <p className={'Catalog__record-tags'}>
          <strong>Tags</strong> <span className={'App--font-thin'}>{hit.tags.join(', ')}</span></p>
        ) : false 
      }
    </div>
  </BSPanel>
)

const Search = ({clearSearch}) => (
  <Grid className={'Catalog'}>
    <Row className='Catalog__search'>
      <Col sm={12}>
        <SearchBox autoFocus />
      </Col>
      <Col sm={12} className={'Catalog__currentRefinements'}>
        <ConnectedStats />
          <CurrentRefinements className={'clearfix'} />
          <ClearAll />
      </Col>
      <Col sm={2} className='Catalog__refine'>
        <Panel title='Categories'>
          <RefinementList className='Catalog__refine--category' attributeName='category' />
        </Panel>
        <Panel title='Departments'>
          <RefinementList className='Catalog__refine--department' attributeName='publishing_dept' withSearchBox showMore limitMax={52} transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
        </Panel>
      </Col>
      <Col sm={10}>
        <Hits hitComponent={Record.bind(this, clearSearch)} />
        <div className={'Catalog__pagination'}>
          <Pagination />
        </div>
      </Col>
    </Row>
  </Grid>
)

export default Search
