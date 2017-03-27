import style from './style.scss'
import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class LoginForm extends React.Component {
  static propTypes = {
    onBack: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  }

  constructor() {
    super()
    this._submit = this._submit.bind(this)
    this._updateInputs = this._updateInputs.bind(this)
    this._validateEmail = this._validateEmail.bind(this)
    this._validateInputs = this._validateInputs.bind(this)
    this._validatePassword = this._validatePassword.bind(this)
    this._validateFirstName = this._validateFirstName.bind(this)
    this._validateLastName = this._validateLastName.bind(this)
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
   * @param {string} firstname - Firstname Value
   * @param {string} lastname - Lastname Value
   */
  _validateInputs(email = '', password = '', firstname = '', lastname = '') {
    return {
      email: this._validateEmail(email),
      password: this._validatePassword(password),
      firstname: this._validateFirstName(firstname),
      lastname: this._validateLastName(lastname)
    }
  }

  /**
   * Validate Email Text
   * @param {string} email - Email Input
   * @return {boolean} - Input is Valid
   */
  _validateEmail (email = '') {
    if (email === '') return { valid: false, text: '' }
    else if (!/\S+@\S+\.\S+/.test(email)) return { valid: false, text: 'This is not a valid email' }
    else return { valid: true, text: '' }
  }

  /**
   * Validate Password Text
   * @param {string} password - Password Code
   * @return {boolean} - Input is Valid
   */
  _validatePassword(password = '') {
    if (password === '') return { valid: false, text: '' }
    else if (password.length < 5) return { valid: false, text: 'The password is too short' }
    else return { valid: true, text: '' }
  }

  /**
   * Validate First Name
   * @param {string} firstname - Input of data
   * @returns {boolean} - Input is Valid
   */
  _validateFirstName(firstname = '') {
    if (firstname === '') return { valid: false, text: '' }
    else if (firstname.length < 3) return { valid: false, text: 'The First Name is too short'}
    else return { valid: true, text: '' }
  }

  /**
   * Validate Last Name
   * @param {string} firstname - Input of data
   * @returns {boolean} - Input is Valid
   */
  _validateLastName(lastname = '') {
    if (lastname === '') return { valid: false, text: '' }
    else if (lastname.length < 3) return { valid: false, text: 'The Last Name is too short'}
    else return { valid: true, text: '' }
  }

  /**
   * 
   * @param {string} email - Email Used
   * @param {*} password - Password Used
   */
  _updateInputs(email, password, firstname, lastname) {
    const validations = this._validateInputs(email, password, firstname, lastname)
    this.setState({
      email,
      password,
      firstname,
      lastname,
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
            hintText='Complete it with your email account'
            floatingLabelText='Email'
            type='email'
            value={this.state.email}
            onChange={(evt, val) => this._updateInputs(val, this.state.password, this.state.firstname, this.state.lastname)}
            errorText={this.state.validations.email.text}
            fullWidth
          />
          <TextField
            hintText='Complete it with your password'
            floatingLabelText='Password'
            type='password'
            value={this.state.password}
            onChange={(evt, val) => this._updateInputs(this.state.email, val, this.state.firstname, this.state.lastname)}
            errorText={this.state.validations.password.text}
            fullWidth
          />
          <TextField
            hintText='Complete it with your First Name'
            floatingLabelText='First Name'
            type='text'
            value={this.state.firstname}
            onChange={(evt, val) => this._updateInputs(this.state.email, this.state.password, val, this.state.lastname)}
            errorText={this.state.validations.firstname.text}
            fullWidth
          />
          <TextField
            hintText='Complete it with your Last Name'
            floatingLabelText='Last Name'
            type='text'
            value={this.state.lastname}
            onChange={(evt, val) => this._updateInputs(this.state.email, this.state.password, this.state.firstname, val)}
            errorText={this.state.validations.lastname.text}
            fullWidth
          />
        </article>
        <article className={style.buttonContainer}>
          <FlatButton 
            label="Back"
            onTouchTap={this.props.onBack}
            primary
          />
          <FlatButton 
            label="Register Account"
            disabled={!this.state.isValid}
            onTouchTap={this._submit}
            primary
          />
        </article>
      </section>
    )
  }
}