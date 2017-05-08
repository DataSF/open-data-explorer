import './@Navigation.css'

import React from 'react'
import { Link } from 'react-router'
import Logo from '../Logo'
import AutoSuggestSearch from '../../containers/AutoSuggestSearch'

export default class Navigation extends React.Component {
  constructor () {
    super()

    this.state = {}
  }

  renderNavItem (page, index) {
    return (
      <li key={'page-' + index}>
        <Link to={page.route}>
          {page.title}
        </Link>
      </li>
    )
  }

  render () {
    let showSearch = (['/', '/catalog'].indexOf(this.props.location.pathname) === -1)
    return (
      <div>
        <div className={'ribbon'}>
          <Link to={'/about'} className={'ribbonTxt'}>alpha</Link>
        </div>
        <nav id={'Navigation'} className={'navbar navbar-default'} role='navigation'>
          <div className={'container'}>
            <div className={'navbar-header'}>
              <button type='button' className={'navbar-toggle'} data-toggle='collapse' data-target='.navbar-collapse'>
                <span className={'sr-only'}>Toggle navigation</span>
                <span className={'icon-bar'} />
                <span className={'icon-bar'} />
                <span className={'icon-bar'} />
              </button>
              <a className={'navbar-brand'} href='#'>
                <Logo />
              </a>
            </div>
            <div className={'navbar-collapse collapse'}>
              { showSearch
                ? <AutoSuggestSearch className={'navbar-form'} />
                : null }
              <ul className={'nav navbar-nav'}>
                {this.props.pages.map(
                    this.renderNavItem.bind(this)
                )}
                <li><a href='http://support.datasf.org/'>Help</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

