import './@Catalog.css'

import React from 'react'
import { Hits, SearchBox, RefinementList, CurrentRefinements, ClearAll, Pagination, Panel, Stats } from 'react-instantsearch/dom'
import { Grid, Row, Col, Panel as BSPanel } from 'react-bootstrap'
import orderBy from 'lodash/orderBy'
import { Link } from 'react-router'
import slugify from 'underscore.string/slugify'
import moment from 'moment'

const Record = (clearSearch, {hit}) => (
  <BSPanel header={<Link to={`${'/' + slugify(hit.category) + '/' + slugify(hit.name) + '/' + hit.systemID}`} onClick={clearSearch}>{hit.name}</Link>} className='Catalog__record' bsStyle='primary'>
    <div className={'Catalog__record-body-wrapper'}>
      <div className={'Catalog__record-meta clearfix'}>
        <div className={'Catalog__record-meta-title'}>Data updated</div>
        <div className={'Catalog__record-meta-value'}>{moment(hit.rowsUpdatedAt * 1000).fromNow()}</div>
        <div className={'Catalog__record-meta-title'}>Target update schedule</div>
        <div className={'Catalog__record-meta-value'}>{hit.publishingFrequency}</div>
        <div className={'Catalog__record-meta-title'}>Category</div>
        <div className={'Catalog__record-meta-value'}>{hit.category}</div>
      </div>
      <div className={'Catalog__record-description clearfix'}>
        <p>{hit.description}</p>
        {hit.tags ? (
          <p>Tags {hit.tags.join(', ')}</p>
          ) : false 
        }
      </div>
    </div>
  </BSPanel>
)

const Search = ({clearSearch}) => (
  <Grid fluid className={'Catalog'}>
    <Row className='Catalog__search'>
      <Col sm={3} className='Catalog__refine'>
        <Panel title='Categories'>
          <RefinementList className='Catalog__refine--category' attributeName='category' />
        </Panel>
        <Panel title='Departments'>
          <RefinementList className='Catalog__refine--department' attributeName='publishing_dept' withSearchBox showMore limitMax={52} transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
        </Panel>
      </Col>
      <Col sm={7}>
        <div>
          <SearchBox autoFocus />
        </div>
        <div className={'Catalog__currentRefinements'}>
          <CurrentRefinements />
          <ClearAll />
          <Stats />
        </div>
        <Hits hitComponent={Record.bind(this, clearSearch)} />
        <div className={'Catalog__pagination'}>
          <Pagination />
        </div>
      </Col>
    </Row>
  </Grid>
)

export default Search
