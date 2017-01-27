import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Row, Col, Nav, NavItem } from 'react-bootstrap'

class DatasetNav extends Component {
  constructor (props) {
    super(props)

    this.handleTabSelect = this.handleTabSelect.bind(this)
  }

  handleTabSelect (key) {
    let pathArray = this.props.location.pathname.split('/')
    // assure we are passing the viewtype at the end of the dataset path
    if (key === 'overview') {
      key = ''
    }
    hashHistory.push('/' + pathArray[1] + '/' + pathArray[2] + '/' + pathArray[3] + '/' + key)
  }

  render () {
    let active = this.props.routes[2].path
    if (!active) active = 'overview'
    return (
      <Row className={'chartTabs DatasetNav'}>
        <Col sm={12}>
          <Nav
            bsStyle='pills'
            activeKey={active}
            onSelect={this.handleTabSelect}>
            <NavItem eventKey={'overview'} className={'tabSelected'}>
              Overview
            </NavItem>
            <NavItem eventKey={'details'} className={'tabSelected'}>
              Column Details
            </NavItem>
            <NavItem eventKey={'charts'} className={'tabSelected'}>
              Charts
            </NavItem>
            <NavItem eventKey={'table'} className={'tabSelected'}>
              Table Preview
            </NavItem>
          </Nav>
        </Col>
      </Row>)
  }
}

export default DatasetNav
