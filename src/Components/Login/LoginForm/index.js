import style from './style.scss'
import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onRegisterPressed: PropTypes.func
  }

  constructor() {
    super()
    this._submit = this._submit.bind(this)
    this._updateInputs = this._updateInputs.bind(this)
    this._validateEmail = this._validateEmail.bind(this)
    this._validateInputs = this._validateInputs.bind(this)
    this._validatePassword = this._validatePassword.bind(this)
    this.state = {
      email: '',
      password: '',
      validations: this._validateInputs()
    }
  }

  /**
   * Update validations of the inputs
   * @param {string} email - Email Value
   * @param {string} password - Password Value
   */
  _validateInputs(email = '', password = '') {
    return {
      email: this._validateEmail(email),
      password: this._validatePassword(password)
    }
  }

  /**
   * Validate Email Text
   * @param {string} email - Email Input
   * @return {boolean} - Input is Valid
   */
  _validateEmail(email = '') {
    if (email === '') return { valid: false, text: '' }
    else if (!/\S+@\S+\.\S+/.test(email))
      return { valid: false, text: 'This is not a valid email' }
    else return { valid: true, text: '' }
  }

  /**
   * Validate Password Text
   * @param {string} password - Password Code
   * @return {boolean} - Input is Valid
   */
  _validatePassword(password = '') {
    if (password === '') return { valid: false, text: '' }
    else if (password.length < 5)
      return { valid: false, text: 'The password is too short' }
    else return { valid: true, text: '' }
  }

  /**
   * 
   * @param {string} email - Email Used
   * @param {*} password 
   */
  _updateInputs(email, password) {
    const validations = this._validateInputs(email, password)
    this.setState({
      email,
      password,
      validations,
      isValid: Object.keys(validations).every(key => validations[key].valid)
    })
  }

  _submit() {
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    return (
      <section>
        <article>
          <TextField
            hintText="Complete it with your email account"
            floatingLabelText="Email"
            type="email"
            value={this.state.email}
            onChange={(evt, val) =>
              this._updateInputs(val, this.state.password)}
            errorText={this.state.validations.email.text}
            fullWidth
          />
          <TextField
            hintText="Complete it with your password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={(evt, val) => this._updateInputs(this.state.email, val)}
            errorText={this.state.validations.password.text}
            fullWidth
          />
        </article>
        <article className={style.buttonContainer}>
          <FlatButton
            label="Register New Account"
            onTouchTap={this.props.onRegisterPressed}
            primary
          />
          <FlatButton
            label="Log In"
            disabled={!this.state.isValid}
            onTouchTap={this._submit}
            primary
          />
        </article>
      </section>
    )
  }
}
