import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as reducers from 'redux/modules'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { checkIfAuthed } from 'helpers/authenticator'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import { hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed by Material-ui. http://www.material-ui.com/#/get-started/installation
injectTapEventPlugin()

const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

const history = syncHistoryWithStore(hashHistory, store)

function checkAuth (nextState, replace) {
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname

  if (isAuthed !== true && nextPathName !== '/authenticate') {
    replace({pathname: '/authenticate', query: {nextPathName: nextPathName}})
  }
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      {getRoutes(checkAuth, history)}
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
