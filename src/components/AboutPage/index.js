import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { setDocumentTitle } from '../../helpers'
import './@AboutPage.css'

export default class AboutPage extends React.Component {
  render () {
    setDocumentTitle('About')
    return (
      <div className={'AboutPage__root'}>
        <section className={'AboutPage__section'}>
          <div className={'container'}>
            <Row>
              <Col>
                <h1 className={'AboutPage__section-heading'}>A New Open Data Exploration Experience</h1>
                <div className={'AboutPage__section-body'}>
                  <p>The Open Data Explorer is designed to make finding and understanding open data easier.</p>
                  <p>The Explorer gives you a way to:</p>
                  <ul>
                    <li> quickly access the City of San Francisco&#39;s open data catalog,</li>
                    <li> visually understand a dataset's underlying structure,</li>
                    <li> easily access a dataset's metadata,</li>
                    <li> test underlying assumptions about a dataset, and</li>
                    <li> determine if a dataset is a candidate for further analysis</li>
                  </ul>
                  <p>It's also an open source project, meaning you can see the <a href='https://github.com/DataSF/open-data-explorer'>source code and contribute if you like</a>.</p>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <section className={'AboutPage__section'}>
          <div className={'container'}>
            <Row>
              <Col>
                <h2 className={'AboutPage__section-heading'}>We're in Beta!</h2>
                <div className={'AboutPage__section-body'}>
                  <p>We're shaking out bugs, tuning the application and gathering information on new features. We would love your input making the Explorer better.</p>
                  <p>You can help us anytime by giving offering your feedback. Use the feedback button at the top if you have an issue to report or an idea! You can read about changes we make, and bugs we fix in the project <a href='https://github.com/DataSF/open-data-explorer/blob/develop/CHANGELOG.md'>CHANGELOG</a></p>
                  <p><strong>Want to get more involved?</strong> Join the beta program below.</p>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <section className={'AboutPage__section'}>
          <div className={'container'}>
            <Row>
              <Col>
                <h2 className={'AboutPage__section-heading'}>Join the Beta Program</h2>
                <div className={'AboutPage__section-body'}>
                  <p>As a member of the beta program, you'll get:</p>
                  <ul>
                    <li>product change updates from the development team,</li>
                    <li>opportunities to help the team test new features,</li>
                    <li>opportunities to give input on future features, and</li>
                    <li>lots of appreciation from the DataSF team for all your help</li>
                  </ul>
                  <p>You can participate at whatever level you have time for by doing one or all of the following:</p>
                  <ul>
                    <li><strong>Use the Explorer as much as you can.</strong> Explore your favorite open datasets. We’ll be logging bugs and anonymous usage data automatically to help make the Explorer better!</li>
                    <li><strong>Use the feedback button in the application.</strong> Have an idea? Found a really problematic bug? Click on the feedback button in the navigation bar to tell us more.</li>
                    <li><strong>Participate in feature testing and other feedback opportunities.</strong> We’ll let you know when these opportunities are available. No pressure, but we’ll make these as fun and rewarding as we can.</li>
                  </ul>
                  <div className={'AboutPage__join-beta-program'}>
                    <a href={'http://eepurl.com/c1r3Jv'} className={'btn btn-primary AboutPage__join-beta-program-button'} bsStyle={'primary'}>Join the beta program today!</a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    )
  }
}
/*
        <section className={'AboutPage__section'}>
          <div className={'container'}>
            <Row>
              <Col>
                <h2 className={'AboutPage__section-heading'}>Need a Demo?</h2>
                <div className={'AboutPage__section-body'}>
                  <p>Watch the quick video below for a 2 minute getting started demo.</p>
                  <p>Video...</p>
                </div>
              </Col>
            </Row>
          </div>
        </section>
*/
