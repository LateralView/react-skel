import { withRouter } from 'react-router-dom'
import { actions } from '../../Actions/User'
import { connect } from 'react-redux'
import Register from './Register'

const mapDispatchToProps = dispatch => ({
  onRegister({ email, password, firstname, lastname }) {
    dispatch(actions.UserCreate(email, password, firstname, lastname))
  }
})

export default withRouter(connect(null, mapDispatchToProps)(Register))
