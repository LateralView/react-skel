import Login from './Login'
import { connect } from 'react-redux'
import { actions } from '../../Actions/User'
import { actions as notificationActions } from '../../Actions/Notifications'
import { withRouter } from 'react-router-dom'

const mapDispatchToProps = dispatch => ({
  onLoginSuccess(payload) {
    dispatch(actions.AuthenticateResolved(payload))
  },
  onLoginFailure(error) {
    dispatch(notificationActions.OpenNotification(error))
  }
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
)
