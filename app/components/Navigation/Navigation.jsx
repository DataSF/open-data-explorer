import './_Navigation.scss'

import React from 'react'
import { Link } from 'react-router'

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
    return (
      <div>
        <div className={'ribbon'}>
          <Link to={'/about'} className={'ribbonTxt'}>alpha</Link>
        </div>
        <nav id={'Navigation'} className={'myNav'}>
          <div className={'navbar navbar-default navbar-fixed-top'} role='navigation'>
            <div className={'container navTotal'}>
              <div className={'navbar-header'}>
                <button type='button' className={'navbar-toggle'} data-toggle='collapse' data-target='.navbar-collapse'>
                  <span className={'sr-only'}>Toggle navigation</span>
                  <span className={'icon-bar'} />
                  <span className={'icon-bar'} />
                  <span className={'icon-bar'} />
                </button>
                <a className={'navbar-brand navImg'} href='#' />
                <a className={'navbar-brand navLogo'} href='#'>DataSF &#47;&#47; Explorer </a>
              </div>
              <div className={'navbar-collapse collapse'}>
                <ul className={'nav navbar-nav navbar-right navLi'}>
                  {this.props.pages.map(
                      this.renderNavItem.bind(this)
                  )}
                  <li><a href='http://support.datasf.org/'>Help</a></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

