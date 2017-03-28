import { fork } from 'redux-saga/effects'
import Login from './Login'
import Notifications from './Notifications'
import Register from './Register'

export default function*() {
  yield [
    fork(Login),
    fork(Register),
    fork(Notifications)
  ]
}