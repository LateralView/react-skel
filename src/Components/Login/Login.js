import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import style from './style.scss'

export default class Login extends React.Component {
  static get propTypes() {
    return {
      onLogin: PropTypes.func,
      onRegister: PropTypes.func,
      history: PropTypes.object.isRequired
    }
  }

  constructor() {
    super()
    this._register = this._register.bind(this)
  }

  _register() {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <h1>Login</h1>
          <LoginForm
            onSubmit={this.props.onLogin}
            onRegisterPressed={this._register}
          />
        </div>
      </div>
    )
  }
}
