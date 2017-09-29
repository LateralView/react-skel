import { fork, all } from 'redux-saga/effects'
import Login from './Login'
import Notifications from './Notifications'
import Register from './Register'

export default function*() {
  yield all([fork(Login), fork(Register), fork(Notifications)])
}
