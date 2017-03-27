import { fork } from 'redux-saga/effects'
import Login from './Login'
import Notifications from './Notifications'

export default function*() {
  yield [
    fork(Login),
    fork(Notifications)
  ]
}