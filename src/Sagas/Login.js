import { Authenticate } from '../API/User'
import { ErrorHandler } from '../API/utils'
import { replace } from 'react-router-redux'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../Actions/User'
import { actions as NotificationActions } from '../Actions/Notifications'

/**
 * Handles Login intent
 * @param {object} action - Action Object 
 */
function* loginHandler({data}) {
  try {
    const res = yield call(Authenticate, data.email, data.password)
    // Check if res.status ~ 200
    if (res.ok) {
      yield put(actions.AuthenticateResolved(res, yield res.json()))
      yield put(replace('/'))
    }
    else throw res
  }
  catch(e) {
    const response = yield ErrorHandler(e)
    yield put(NotificationActions.OpenNotification(response.message, 1500))
    yield put(actions.AuthenticateRejected(e, response))
  }
}

/**
 * Handles Logout
 */
function* logoutHandler() {
  yield put(replace('/login'))
}

export default function*() {
  yield takeLatest(types.AUTHENTICATE_INTENT, loginHandler)
  yield takeLatest(types.LOGOUT_INTENT, logoutHandler)
} 