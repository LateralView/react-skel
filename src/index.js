import style from './index.scss'
import React from 'react'
import store from './store'
import './semanticui/semantic.less'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

// import Login from './Components/Login'
import Home from './Components/Home'
// import Register from './Components/Register'
// import Notifications from './Components/Notifications'
import { OnlyPublicRoute } from './Components/Routing'

const __store = store()
const __init_el = document.createElement('div')
__init_el.id = style.reactinit

ReactDOM.render(
  <Provider store={__store}>
    <div>
      {/* <Notifications /> */}
      <Router>
        <div>
          <OnlyPublicRoute path="/" component={Home} />
          {/* <OnlyPublicRoute path="/login" component={Login} />
          <OnlyPublicRoute path="/register" component={Register} /> */}
        </div>
      </Router>
    </div>
  </Provider>,
  document.body.appendChild(__init_el)
)
