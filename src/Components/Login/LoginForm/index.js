import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Icon, Label, Form } from 'semantic-ui-react'

import style from './style.scss'
import {
  validateEmail,
  validatePassword
} from '../../../Shared/Utils/validations'

export default class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onRegisterPressed: PropTypes.func
  }

  constructor() {
    super()
    this._submit = this._submit.bind(this)
    this._updateInputs = this._updateInputs.bind(this)
    this.state = {
      email: '',
      password: ''
    }
  }

  isValid = () => {
    return (
      this.email &&
      validateEmail(this.email) &&
      this.password &&
      validatePassword(this.password)
    )
  }

  /**
   *
   * @param {string} email - Email Used
   * @param {*} password
   */
  _updateInputs(email, password) {
    this.setState({
      email,
      password
    })
  }

  _submit() {
    if (this.isValid()) {
      this.props.onSubmit({
        email: this.state.email,
        password: this.state.password
      })
    }
  }

  render() {
    return (
      <section>
        <article>
          <Form.Field>
            <Input
              iconPosition="left"
              placeholder="Complete it with your email account"
              type="email"
              value={this.state.email}
              onChange={val =>
                this._updateInputs(val.target.value, this.state.password)
              }
              error={!validateEmail(this.state.email)}
            >
              <Icon name="at" />
              <input />
            </Input>
            {!validateEmail(this.state.email) && (
              <Label basic color="red" pointing>
                This is not a valid email
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <Input
              iconPosition="left"
              placeholder="Password"
              type="password"
              hint="Complete it with your password"
              value={this.state.password}
              onChange={val =>
                this._updateInputs(this.state.email, val.target.value)
              }
              error={!validatePassword(this.state.password)}
            >
              <Icon name="at" />
              <input />
            </Input>
            {!validatePassword(this.state.password) && (
              <Label basic color="red" pointing>
                Password is too short
              </Label>
            )}
          </Form.Field>
        </article>

        <article className={style.buttonContainer}>
          <Button
            content="Register New Account"
            onClick={this.props.onRegisterPressed}
          />
          <Button
            content="Log In"
            disabled={!this.state.isValid}
            onClick={this._submit}
            primary
          />
        </article>
      </section>
    )
  }
}
