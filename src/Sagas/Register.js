import { Create } from '../API/User'
import { replace } from 'react-router-redux'
import { ErrorHandler } from '../API/utils'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../Actions/User'
import { actions as NotificationActions } from '../Actions/Notifications'

function* userCreationHandler({data}) {
  try {
    const res = yield call(Create, data)
    // Check if res.status ~ 200
    if (res.ok) {
      yield put(NotificationActions.OpenNotification('Check your email and validate your account :)', 1500))
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

export default function* () {
  yield takeLatest(types.USER_CREATE_INTENT, userCreationHandler)
}