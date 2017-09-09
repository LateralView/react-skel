import { connect } from 'react-redux'
import { actions } from '../../Actions/Notifications'
import Notifications from './Notifications'

const mapStateToProps = state => ({
  Notifications: state.Notifications
})

const mapDispatchToProps = dispatch => ({
  OnNotificationTimeout(id) {
    return dispatch(actions.OnNotificationTimeout(id))
  },
  OnActionTap(id) {
    return dispatch(actions.OnActionTap(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
