import uuid from 'node-uuid'

export const types = {
  NOTIFICATION_OPENED: 'NOTIFICATION_OPENED',
  NOTIFICATION_ACTION: 'NOTIFICATION_ACTION',
  NOTIFICATION_TIMEOUT: 'NOTIFICATION_TIMEOUT'
}

export const actions = {
  /**
   * Generates a New Notification
   * @param {string} message - Message to Show
   * @param {number} autoHide - Timeout to Close, in ms.
   * @param {string} actionMessage - Action Message that can be clicked
   * @param {function} actionMethod - Action To Do
   */
  OpenNotification(message, autoHide = 3000, actionMessage, actionMethod) {
    return {
      type: types.NOTIFICATION_OPENED,
      notification: {
        _id: uuid.v4(),
        message,
        autoHide,
        actionMessage,
        actionMethod
      }
    }
  },

  /**
   * Called when the notification closes by timeout
   * @param {string} id - Id of the notification
   */
  OnNotificationTimeout(id) {
    return {
      type: types.NOTIFICATION_TIMEOUT,
      id
    }
  },

  /**
   * Called When the action of the notification is tapped
   * @param {string} id - Id of the notification
   */
  OnActionTap(id) {
    return {
      type: types.NOTIFICATION_ACTION,
      id
    }
  }
}

export const selector = state => state.Notifications
