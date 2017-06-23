import style from './index.scss'
import React from 'react'
import store from './store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BrowserRouter as Router } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Login from './Components/Login'
import Home from './Components/Home'
import Header from './Components/Header'
import Register from './Components/Register'
import Notifications from './Components/Notifications'
import { PrivateRoute, OnlyPublicRoute } from './Components/Routing'

const __store = store()
const __init_el = document.createElement('div')
__init_el.id = style.reactinit

injectTapEventPlugin()

ReactDOM.render(
  <Provider store={__store}>
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
      <div>
        <Notifications />
        <Header />
        <Router>
          <div>
            <PrivateRoute path="/" component={Home} />
            <OnlyPublicRoute path="/login" component={Login} />
            <OnlyPublicRoute path="/register" component={Register} />
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.body.appendChild(__init_el)
)
