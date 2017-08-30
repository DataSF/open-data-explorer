import './@HomePage.css'

import React from 'react'
import AutoSuggestSearch from '../../containers/AutoSuggestSearch'
import { setDocumentTitle } from '../../helpers'
import model from './model'

import background from './logo_big.png'

let imgStyle = {
  position: 'absolute',
  top: 0,
  left: '50%',
  marginLeft: '-250px',
  opacity: 0.05,
  zIndex: 0
}

const FeatureSection = ({ data }) => (
  <section className={'FeatureSection__root'}>
    <div className={'container'} style={{ position: 'relative' }}>
      <div className={'row'}>
        <div className={'col-md-6 FeatureSection__text'}>
          <h3 className={'FeatureSection__short'}>{data.short}</h3>
          <div className={'FeatureSection__title'}>{data.title}</div>
          <p className={'FeatureSection__body'}>{data.body}</p>
        </div>
        <div className={'col-md-6 FeatureSection__image'}>
          <div className={'FeatureSection__browser'}>
            <div className={'FeatureSection__browser-top'}>
              <div className={'FeatureSection__browser-buttons FeatureSection__browser-buttons--red'} />
              <div className={'FeatureSection__browser-buttons FeatureSection__browser-buttons--yellow'} />
              <div className={'FeatureSection__browser-buttons FeatureSection__browser-buttons--green'} />
            </div>
            <img src={data.imgSrc} alt={data.imgAlt} style={{width:'100%'}}/>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const HomePage = () => {
  setDocumentTitle(false)
  return (
    <div id='main-container'>
      <section id='jumbo-search' className={'jumbotron jumbotron-default homepage'} >
        <div className={'container'} style={{ position: 'relative' }}>
          <img src={background} style={imgStyle} alt='' />
          <h1>Open Data Explorer</h1>
          <h2>San Francisco</h2>
          <p>Hundreds of datasets at your fingertips. Search and explore open data from the City and County of San Francisco.</p>
          <div className={'row'}>
            <div className={'col-md-12 HomePage__search'}>
              <AutoSuggestSearch />
            </div>
          </div>
        </div>
      </section>
      {model.map((section, idx) => {
        return <FeatureSection data={section} key={idx} />
      })}
    </div>
  )
}

export default HomePage
