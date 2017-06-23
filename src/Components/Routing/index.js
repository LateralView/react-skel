import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import OnlyLoggedIn from './OnlyLoggedIn'
import OnlyLoggedOut from './OnlyLoggedOut'

const mapStateToProps = state => ({
  user: state.User
})

export const PrivateRoute = withRouter(connect(mapStateToProps)(OnlyLoggedIn))
export const OnlyPublicRoute = withRouter(
  connect(mapStateToProps)(OnlyLoggedOut)
)
