import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'react-toolbox/lib/snackbar'

export default class Notifications extends React.Component {
  static get propTypes() {
    return {
      Notifications: PropTypes.array,
      OnNotificationTimeout: PropTypes.func,
      OnActionTap: PropTypes.func
    }
  }

  render() {
    return (
      <div>
        {this.props.Notifications.map(notif => (
          <Snackbar
            key={notif._id}
            active={notif._open}
            action={notif.actionMessage || null}
            timeout={notif.autoHide}
            onClick={() => this.props.OnActionTap(notif._id)}
            onTimeout={() => this.props.OnNotificationTimeout(notif._id)}
          >
            {notif.message}
          </Snackbar>
        ))}
      </div>
    )
  }
}
