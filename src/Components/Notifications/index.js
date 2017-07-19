import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from '../../Actions/Notifications'
import { Snackbar } from 'react-toolbox'

class Notifications extends React.Component {
  static propTypes = {
    Notifications: PropTypes.array,
    OnNotificationTimeout: PropTypes.func,
    OnActionTap: PropTypes.func
  }

  static mapStateToProps = state => ({
    Notifications: state.Notifications
  })

  static mapDispatchToProps = dispatch => ({
    OnNotificationTimeout(id) {
      return dispatch(actions.OnNotificationTimeout(id))
    },
    OnActionTap(id) {
      return dispatch(actions.OnActionTap(id))
    }
  })

  render() {
    return (
      <div>
        {this.props.Notifications.map(notif =>
          <Snackbar
            key={notif._id}
            active={notif._open}
            action={notif.actionMessage || null}
            timeout={notif.autoHideDuration || 1500}
            onClick={() => this.props.OnActionTap(notif._id)}
            onTimeout={() => this.props.OnNotificationTimeout(notif._id)}
          >
            {notif.message}
          </Snackbar>
        )}
      </div>
    )
  }
}

export default connect(
  Notifications.mapStateToProps,
  Notifications.mapDispatchToProps
)(Notifications)
