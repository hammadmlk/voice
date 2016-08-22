import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { MainContainer, HomePageContainer, AuthenticateContainer,
         TopicPageContainer } from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Route path='/' component={MainContainer}>
        <IndexRoute component={HomePageContainer} onEnter={checkAuth} />
        <Route path='authenticate' component={AuthenticateContainer} />
        <Route path=':creator/:slug' component={TopicPageContainer} onEnter={checkAuth} />
      </Route>
    </Router>
  )
}
