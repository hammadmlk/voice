import React from 'react'
import { MainContainer, HomeContainer } from '../containers'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

export default (
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
    </Route>
  </Router>
 )
