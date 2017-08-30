import './@Navigation.css'
import React from 'react'
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import Logo from '../Logo'
import AutoSuggestSearch from '../../containers/AutoSuggestSearch'

const Navigation = ({ location, pages }) => {
  let showSearch = (['/', '/catalog'].indexOf(location.pathname) === -1)
  let reportBugUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfpDztrdfGpeSUC6YKaj08zI6g6sJJhHMeZDmH69AGyX_YLCQ/viewform?usp=pp_url&entry.1755031735=' + encodeURIComponent(window.navigator.userAgent)
  return (
    <div>
      <div className={'ribbon'}>
        <Link to={'/about'} className={'ribbonTxt'}>beta</Link>
      </div>
      <nav id={'Navigation'} className={'navbar navbar-default'}>
        <div className={'container'}>
          <div className={'navbar-header'}>
            <button type='button' className={'navbar-toggle'} data-toggle='collapse' data-target='.navbar-collapse'>
              <span className={'sr-only'}>Toggle navigation</span>
              <span className={'icon-bar'} />
              <span className={'icon-bar'} />
              <span className={'icon-bar'} />
            </button>
            <Link to={'/'} className={'navbar-brand'}>
              <Logo />  
            </Link>
          </div>
          <div className={'navbar-collapse collapse'}>
            <ul className={'nav navbar-nav'}>
              {pages.map(
                  renderNavItem.bind(this)
              )}
              <li><a href='http://support.datasf.org/'>Help</a></li>
              <NavDropdown eventKey={3} title='Feedback' id='feedbackButton'>
                <MenuItem eventKey={3.1} href={reportBugUrl} target='_blank'>Report Bug</MenuItem>
                <MenuItem eventKey={3.2} href={'https://docs.google.com/forms/d/e/1FAIpQLSfLcOX8nrJTz3q07iWzW3MkY1f9NLH3tIFaUTdJ2lxBCYkrbw/viewform?usp=sf_link'} target='_blank'>Other Feedback</MenuItem>
              </NavDropdown>
            </ul>
            { showSearch
              ? <div className={'pull-right'}><AutoSuggestSearch className={'navbar-form'} /></div>
              : null }
          </div>
        </div>
      </nav>
    </div>
  )
}

const renderNavItem = (page, index) => (
  <li key={'page-' + index}>
    <Link to={page.route}>
      {page.title}
    </Link>
  </li>
)

export default Navigation