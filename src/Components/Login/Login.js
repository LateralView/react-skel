import style from './style.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'

import LoginForm from './LoginForm'
import { Authenticate } from '../../API/User'

export default class Login extends React.Component {
  static get propTypes() {
    return {
      onLoginSuccess: PropTypes.func,
      onLoginFailure: PropTypes.func,
      onRegister: PropTypes.func,
      history: PropTypes.object.isRequired
    }
  }

  constructor() {
    super()
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin(email, password) {
    Authenticate(email, password)
      .then(response => {
        if (response.status === 200)
          response.json().then(response => this.props.onLoginSuccess(response))
        else {
          const errorMessage =
            response.status === 401
              ? 'Invalid email or password'
              : 'Uknown error has ocurred'
          this.props.onLoginFailure(errorMessage)
        }
      })
      .catch(error => this.props.onLoginFailure(error.message))
  }

  render() {
    return (
      <div className={style.parentView}>
        <Card>
          <CardTitle title="Login" subtitle="Log in With your SKEL Account" />
          <CardText>
            <LoginForm onSubmit={this.onLogin} />
          </CardText>
        </Card>
      </div>
    )
  }
}
