import './_Catalog.scss'

import React from 'react'
import { InstantSearch, Hits, SearchBox, RefinementList, CurrentRefinements, ClearAll, Pagination, Panel, Stats } from 'react-instantsearch/dom'
import { Grid, Row, Col, Panel as BSPanel } from 'react-bootstrap'
import orderBy from 'lodash/orderBy'
import { Link } from 'react-router'
import slugify from 'underscore.string/slugify'

const Record = ({hit}) => (
  <BSPanel header={<Link to={`${'/' + slugify(hit.category) + '/' + slugify(hit.name) + '/' + hit.systemID}`}>{hit.name}</Link>} className='Catalog__record-header'>
    <p>{hit.description}</p>
  </BSPanel>
)

const Search = () => (
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
          <SearchBox />
          <ClearAll />
        </div>
        <div className={'Catalog__currentRefinements'}>
          <CurrentRefinements />
          <Stats />
        </div>
        <Hits hitComponent={Record} />
        <div className={'Catalog__pagination'}>
          <Pagination />
        </div>
      </Col>
    </Row>
  </Grid>
)

const CatalogN = () => (
  <InstantSearch
    appId='N6IVMSP2S4'
    apiKey='3bd0fc517f80911bf21045747262a1bd'
    indexName='dev_dataset_search'
  >
    <Search />
  </InstantSearch>
)

export default CatalogN
