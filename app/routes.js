import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './components/HomePage/HomePage'
import CatalogN from './components/CatalogN'
import Dataset from './containers/Dataset'
import DatasetOverview from './containers/DatasetOverview'
import ColumnDetails from './containers/ColumnDetails'
import DataTable from './containers/DataTable'
import AboutPage from './components/AboutPage/AboutPage'
import VizContainer from './containers/VizContainer'
import Embed from './containers/Embed'

export default (
  <Route component={App} path='/'>
    <Route path='/e/:id' component={Embed} />
    <IndexRoute component={HomePage} />
    <Route path='/catalog' component={CatalogN}>
      <IndexRoute component={CatalogN} />
      <Route path=':page' component={CatalogN} />
    </Route>
    <Route path='/about' component={AboutPage}>
      <IndexRoute component={AboutPage} />
      <Route path=':page' component={AboutPage} />
    </Route>
    <Route path='/:category/:title/:id' components={Dataset}>
      <IndexRoute component={DatasetOverview} />
      <Route path='overview' component={DatasetOverview} />
      <Route path='details' component={ColumnDetails} />
      <Route path='charts' component={VizContainer} />
      <Route path='map' component={Dataset} />
      <Route path='table' component={DataTable} />
    </Route>
  </Route>
)
