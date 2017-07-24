import React from 'react'
import { browserHistory } from 'react-router'
import { Row, Col, Nav, NavItem } from 'react-bootstrap'
import DownloadLinks from './DatasetDownloads'
import './@DatasetNav.css'

const DatasetNav = ({routes, location, hasGeo, id, dataId}) => {
  let handleTabSelect = (key, e) => {
    e.preventDefault()
    let pathArray = location.pathname.split('/')
    key = key === 'overview' ? '' : key
    if (key === 'api') {
      window.location.href = 'https://dev.socrata.com/foundry/data.sfgov.org/' + dataId
    } else {
      browserHistory.push('/' + pathArray[1] + '/' + pathArray[2] + '/' + pathArray[3] + '/' + key)
    }
  }

  let active = routes[2].path
  if(!active) active='overview'

  return (
    <div className='container'>
      <Row className={'chartTabs DatasetNav'}>
        <Col sm={12}>
        <div className={'dataset-nav-btns'}>
          <Nav
            bsStyle={'pills'}
            className={'nav'}
            activeKey={active}
            onSelect={handleTabSelect}>
            <NavItem eventKey={'overview'} className={'tabSelected'}>
              Overview
            </NavItem>
            <NavItem eventKey={'table'} className={'tabSelected'}>
              Table Preview
            </NavItem>
            <NavItem eventKey={'fields'} className={'tabSelected'}>
              Field Definitions
            </NavItem>
            <NavItem eventKey={'charts'} className={'tabSelected'}>
              Charts
            </NavItem>
            <DownloadLinks hasGeo={hasGeo} id={id} dataId={dataId} />
            <NavItem eventKey={'api'}>
              API Docs
            </NavItem>
          </Nav>
        </div>
        </Col>
      </Row>
      </div>
  )
}

export default DatasetNav
