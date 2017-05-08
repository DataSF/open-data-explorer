import './_Catalog.scss'

import React from 'react'
import { Hits, SearchBox, RefinementList, CurrentRefinements, ClearAll, Pagination, Panel, Stats } from 'react-instantsearch/dom'
import { Grid, Row, Col, Panel as BSPanel } from 'react-bootstrap'
import orderBy from 'lodash/orderBy'
import { Link } from 'react-router'
import slugify from 'underscore.string/slugify'

const Record = (clearSearch, {hit}) => (
  <BSPanel header={<Link to={`${'/' + slugify(hit.category) + '/' + slugify(hit.name) + '/' + hit.systemID}`} onClick={clearSearch}>{hit.name}</Link>} className='Catalog__record-header'>
    <p>{hit.description}</p>
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
      <Col sm={8}>
        <div>
          <SearchBox autoFocus />
          <ClearAll />
        </div>
        <div className={'Catalog__currentRefinements'}>
          <CurrentRefinements />
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
