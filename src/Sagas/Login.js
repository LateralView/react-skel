import { Authenticate } from '../API/User'
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
    // Dispatch a error.
    const errmsg = yield e.json()
    yield put(NotificationActions.OpenNotification('Snap, something went wrong', 1500))
    yield put(actions.AuthenticateRejected(e, errmsg))
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