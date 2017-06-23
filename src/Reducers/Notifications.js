import { takeRight } from 'lodash'
import { types } from '../Actions/Notifications'

export default (state = [], action) => {
  switch (action.type) {
    case types.NOTIFICATION_OPENED:
      return [...takeRight(state, 4), { ...action.notification, _open: true }]

    case types.NOTIFICATION_TIMEOUT:
      return state.map(notification => {
        if (notification._id === action.id)
          return { ...notification, _open: false }
        else return notification
      })

    case types.NOTIFICATION_ACTION:
      return state.map(notification => {
        if (notification._id === action.id)
          return { ...notification, actionSelected: true }
        else return notification
      })

    default:
      return state
  }
}
