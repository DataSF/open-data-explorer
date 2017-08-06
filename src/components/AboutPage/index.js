import React from 'react'
import { Grid } from 'react-bootstrap'
import { setDocumentTitle } from '../../helpers'

export default class AboutPage extends React.Component {
  render () {
    setDocumentTitle('About')
    return (
      <Grid fluid id='main-container' className={'catalogMain'}>
        <h2>This site is in ALPHA: Were just getting started and adding new features. </h2>
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
    )
  }
}
