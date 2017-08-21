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
                  <p>Still under active development, the Explorer gives you a way to:</p>
                  <ul>
                    <li> quickly and efficiently access the City of San Francisco&#39;s open data catalog,</li>
                    <li> visually understand a dataset&#39;s underlying structure,</li>
                    <li> visually detect patterns, outliers and anomalies in a dataset,</li>
                    <li> more clearly access a dataset&#39;s metadata,</li>
                    <li> test underlying assumptions about a dataset, and </li>
                    <li> determine if a dataset is a candidate for further analysis</li>
                  </ul>
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
                  <p>What does that mean? We're collecting feedback from our users to make this experience even better. You can participate now simply by giving feedback anywhere in the application.</p>
                  <p>Click the feedback button in the navigation bar at the top if you have an issue to report or an idea!</p>
                  <p>Want to get more involved? Join the beta program below.</p>
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
                    <li>occasional optional invitations to help the team with additional testing
,</li>
                    <li>occasional optional roadmap review sessions where you’ll get updates from the team and can provide input on upcoming features, and
</li>
                    <li>lots of appreciation from the DataSF team for all your help</li>
                  </ul>
                  <p>You can participate at whatever level you have time for by doing one or all of the following:</p>
                  <ul>
                    <li><strong>Use the application as much as you can.</strong> Explore your favorite open datasets. We’ll be logging bugs and anonymous usage data automatically to help make the app better!</li>
                    <li><strong>Use the feedback button in the application.</strong> Have an idea? Found a really problematic issue? Let us know, use the button in the top navigation bar.
,</li>
                    <li><strong>Participate in user testing and other feedback opportunities.</strong> We’ll let you know when these opportunities arise. No pressure, but we’ll make these as fun and rewarding as we can.

</li>
                  </ul>
                  <div className={'AboutPage__join-beta-program'}>
                    <Button className={'AboutPage__join-beta-program-button'} bsStyle={'primary'}>Join today!</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
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
      </div>
    )
  }
}
/*
<Grid id='main-container' className={'catalogMain'}>
        
        <h1>This site is in ALPHA: Were just getting started and adding new features. </h1>
        <h2>We&#39;d love to get <a href='https://docs.google.com/forms/d/e/1FAIpQLSfrtwGrrGkGs0B_kkWhNJD3RyJRqCrjkpP8oikRQGr7nYjMdA/viewform'> your feedback</a></h2>
        <h3>This tool aims to maximize exploration and use of open data.</h3>
        <h4> We hope that the open data explorer gives users a way to:</h4>
        <ul>
          <li> quickly and efficiently access the City of San Francisco&#39;s dataset catalog</li>
          <li> visually understand a dataset&#39;s underlying structure</li>
          <li> visually detect patterns, outliers and anomalies in a dataset </li>
          <li> more clearly access a dataset&#39;s metadata</li>
          <li> test their underlying assumptions about a dataset </li>
          <li> determine if a dataset is a candidate for further analysis</li>
        </ul>
        <h3>Want to help build out this tool!? Or interested to see how the open data explorer was made? Checkout out the github repo for this project <a href='https://github.com/DataSF/open-data-explorer'> here</a>.</h3>

      </Grid>
*/
