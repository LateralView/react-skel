import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import User from './User'
import Notifications from './Notifications'

export default combineReducers({
  User,
  Notifications,
  routing: routerReducer
})