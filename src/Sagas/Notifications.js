import { call, takeEvery, select } from 'redux-saga/effects'
import { types as NotificationTypes, selector } from '../Actions/Notifications'

function* notificationTapHandler({ id }) {
  const notifications = yield select(selector)
  const notification = notifications.find(
    notification => notification._id === id
  )

  yield call(notification.actionMethod)
}

export default function*() {
  yield takeEvery(NotificationTypes.NOTIFICATION_ACTION, notificationTapHandler)
}
