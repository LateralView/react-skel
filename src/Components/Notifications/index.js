import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../Actions/Notifications'
import Snackbar from 'material-ui/Snackbar'

class Notifications extends React.Component {
  static propTypes = {
    Notifications: React.PropTypes.array,
    OnNotificationTimeout: React.PropTypes.func,
    OnActionTap: React.PropTypes.func
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
    return <div>{this.props.Notifications
      .map(notif => <Snackbar
        key={notif._id}
        open={notif._open}
        message={notif.message}
        action={notif.actionMessage || null}
        autoHideDuration={notif.autoHideDuration || 1500}
        onRequestClose={() => this.props.OnNotificationTimeout(notif._id)}
        onActionTouchTap={() => this.props.OnActionTap(notif._id)}
      />)}</div>
  }
}

export default connect(Notifications.mapStateToProps, Notifications.mapDispatchToProps)(Notifications)