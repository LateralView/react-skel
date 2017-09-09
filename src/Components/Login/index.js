import Login from './Login'
import { connect } from 'react-redux'
import { actions } from '../../Actions/User'
import { withRouter } from 'react-router-dom'

const mapDispatchToProps = dispatch => ({
  onLogin({ email, password }) {
    dispatch(actions.Authenticate(email, password))
  }
})

export default withRouter(connect(null, mapDispatchToProps)(Login))
