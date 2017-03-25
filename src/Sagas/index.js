import { fork } from 'redux-saga/effects'
import Login from './Login'

export default function*() {
  yield [
    fork(Login)
  ]
}