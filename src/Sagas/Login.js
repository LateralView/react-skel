import { Authenticate } from '../API/User'
import { replace } from 'react-router-redux'
import { call, apply, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../Actions/User'

/**
 * Handles Login intent
 * @param {object} action - Action Object 
 */
function* loginHandler({data}) {
  try {
    console.log(data)
    const res = yield call(Authenticate, data.email, data.password)
    console.log(res)
    // Check if res.status ~ 200
    if (res.ok) {
      yield put(actions.AuthenticateResolved(res, yield res.json()))
      yield put(replace('/'))
    }
    else throw res
  }
  catch(e) {
    console.log(e)
    // Dispatch a error.
    const errmsg = yield e.json()
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