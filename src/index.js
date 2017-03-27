import style from './index.scss'
import React from 'react'
import store from './store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AuthMiddleware from './Middlewares/AuthMiddleware'

import Login from './Components/Login'
import Home from './Components/Home'
import Header from './Components/Header'
import Register from './Components/Register'
import Notifications from './Components/Notifications'

const __store = store()
const __auth_midleware = new AuthMiddleware(__store, '/', '/login', state => !!state.User.token)
const __init_el = document.createElement('div')
__init_el.id = style.reactinit

injectTapEventPlugin()


ReactDOM.render((
  <Provider store={__store}>
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
      <div>
        <Notifications />
        <Header />
        <Router history={syncHistoryWithStore(browserHistory, __store)}>
          <Route path='/' component={Home} onEnter={__auth_midleware.OnlyLoggedIn()} />
          <Route path='/login' component={Login} onEnter={__auth_midleware.OnlyLoggedOut()} />
          <Route path='/register' component={Register} onEnter={__auth_midleware.OnlyLoggedOut} />
        </Router>
      </div>
    </MuiThemeProvider>
  </Provider>
), document.body.appendChild(__init_el))