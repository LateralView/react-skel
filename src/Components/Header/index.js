import { connect } from 'react-redux'
import { actions } from '../../Actions/User'
import Header from './Header'

const mapStateToProps = state => ({
  user: state.User.user,
  loggedIn: !!state.User.token
})

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(actions.Logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
