import './@Catalog.css'

import React from 'react'
import { SortBy, ScrollTo, Hits, SearchBox, RefinementList, CurrentRefinements, ClearAll, Pagination, Panel } from 'react-instantsearch/dom'
import { connectStats } from 'react-instantsearch/connectors'
import { Grid, Row, Col, Panel as BSPanel } from 'react-bootstrap'
import ReadMore from '../ReadMore'
import orderBy from 'lodash/orderBy'
import { Link } from 'react-router'
import slugify from 'underscore.string/slugify'
import moment from 'moment'

const CustomStats = ({nbHits}) => <span className={'ais-Stats__root clearfix'}>{nbHits} results found.</span>

const ConnectedStats = connectStats(CustomStats)

const Record = (onClickRecord, {hit}) => (
  <BSPanel 
    header={<Link to={`${'/' + slugify(hit.category) + '/' + slugify(hit.name) + '/' + hit.objectID}`} onClick={onClickRecord.bind(this,hit)}>
        {hit.name}
      </Link>} 
    className='Catalog__record' 
    bsStyle='primary'>
    <div className={'Catalog__record-meta-dept'}>
      <div className={'Catalog__record-meta-dept-value'}>{hit.publishingDepartment}</div>
    </div>
    <div className={'Catalog__record-meta clearfix'}>
      <div className={'Catalog__record-meta-title'}>Data updated</div>
      <div className={'Catalog__record-meta-value'}>{moment.utc(hit.rowsUpdatedAt).local().fromNow()}</div>
      <div className={'Catalog__record-meta-title'}>Target update schedule</div>
      <div className={'Catalog__record-meta-value'}>{hit.publishingFrequency}</div>
      <div className={'Catalog__record-meta-title'}>Category</div>
      <div className={'Catalog__record-meta-value'}>{hit.category}</div>
      <div className={'Catalog__record-meta-title'}>Row count</div>
      <div className={'Catalog__record-meta-value'}>{hit.rowCount.toLocaleString()}</div>
    </div>
    <div className={'Catalog__record-description clearfix'}>
      <div className={'Catalog__record-description-text'}>
        <ReadMore text={hit.description}/>
      </div>
      {hit.keywords ? (
        <p className={'Catalog__record-tags'}>
          <strong>Tags</strong> <span className={'App--font-thin'}>{hit.keywords.join(', ')}</span></p>
        ) : false 
      }
    </div>
  </BSPanel>
)

const labelRefinements = (items) => {
  let labels = {'category': 'Category: ', 'publishingDepartment': 'Department: ', 'fieldTypes': 'Field Types: '}
  let transform = items.map((item) => {
    let copy = Object.assign({}, item)
    copy.label = labels[copy['attributeName']]
    return copy
  })
  return transform
}

const Search = ({onClickRecord}) => (
  <Grid className={'Catalog'}>
    <Row className='Catalog__search'>
      <ScrollTo>
        <Col sm={12}>
          <SearchBox autoFocus />
        </Col>
      </ScrollTo>
    </Row>
    <Row>
      <Col sm={12}>
        <div className={'Catalog__currentRefinements'}>
          <ConnectedStats />
          <CurrentRefinements transformItems={labelRefinements}/>
          <ClearAll />
        </div>
        <div className={'Catalog__sortBy'}>
          <span className={'Catalog__sortBy-label'}>Sort by</span>
          <SortBy
          items={[
            { value: 'dev_dataset_search', label: 'Most Relevant' },
            { value: 'dev_dataset_search_alpha', label: 'A to Z' },
            { value: 'dev_dataset_search_created', label: 'Recently Created'},
            { value: 'dev_dataset_search_updated', label: 'Recently Updated'}
          ]}
          defaultRefinement='dev_dataset_search'
        />
        </div>
      </Col>
    </Row>
    <Row>
      <Col sm={2} className='Catalog__refine'>
        <Panel title='Categories'>
          <RefinementList className='Catalog__refine--category' attributeName='category' />
        </Panel>
        <Panel title='Field Types'>
          <RefinementList className='Catalog__refine--field-types' attributeName='fieldTypes' transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
        </Panel>
        <Panel title='Departments'>
          <RefinementList className='Catalog__refine--department' attributeName='publishingDepartment' withSearchBox showMore limitMax={52} transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
        </Panel>
      </Col>
      <Col sm={10}>
        <Hits hitComponent={Record.bind(this, onClickRecord)} />
        <div className={'Catalog__pagination'}>
          <Pagination />
        </div>
      </Col>
    </Row>
  </Grid>
)

export default Search
