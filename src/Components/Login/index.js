import style from './style.scss'
import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import { withRouter } from 'react-router-dom'
import { actions } from '../../Actions/User'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

class Login extends React.Component {
  static mapStateToProps = () => ({})
  static propTypes = {
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    history: PropTypes.object.isRequired
  }
  static mapDispatchToProps = dispatch => ({
    onLogin({ email, password }) {
      dispatch(actions.Authenticate(email, password))
    }
  })

  constructor() {
    super()
    this._register = this._register.bind(this)
  }

  _register() {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div className={style.parentView}>
        <Card>
          <CardTitle title="Login" subtitle="Log in With your SKEL Account" />
          <CardText>
            <LoginForm
              onSubmit={this.props.onLogin}
              onRegisterPressed={this._register}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect(Login.mapStateToProps, Login.mapDispatchToProps)(Login)
)
