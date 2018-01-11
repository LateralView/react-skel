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

  constructor(props) {
    super(props)
    this.state = {
      formData: {
        email: '',
        password: ''
      },
      formValidations: {}
    }
  }

  handleChange = e => {
    const value =
      e.target.type === 'number' && e.target.value
        ? Number(e.target.value)
        : e.target.value

    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [e.target.name]: value
      }
    })
  }

  validations = e => {
    const { name, value } = e.target

    function validation() {
      switch (name) {
        case 'email':
          return !!value && validateEmail(value)

        case 'password':
          return !!value && validatePassword(value)

        default:
          return {}
      }
    }

    this.setState({
      ...this.state,
      formValidations: {
        ...this.state.formValidations,
        [name]: validation()
      }
    })
  }

  isValid = () => {
    const error = Object.values(this.state.formValidations).some(
      el => el === false
    )

    return !error
  }

  submit = () => {
    const { email, password } = this.state

    if (this.isValid()) {
      this.props.onSubmit({
        email,
        password
      })
    }
  }

  render() {
    const { email, password } = this.state.formData
    const { formValidations } = this.state

    return (
      <form ref={form => (this.form = form)}>
        <article>
          <Form.Field>
            <Input
              iconPosition="left"
              placeholder="Complete it with your email account"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={!formValidations.email}
              onBlur={this.validations}
              autoComplete="off"
            >
              <Icon name="at" />
              <input />
            </Input>
            {formValidations.email === false && (
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
              name="password"
              hint="Complete it with your password"
              value={password}
              onChange={this.handleChange}
              error={formValidations.password === false}
              onBlur={this.validations}
              autoComplete="off"
            >
              <Icon name="key" />
              <input />
            </Input>
            {formValidations.password === false && (
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
            disabled={!this.isValid()}
            onClick={this.submit}
            primary
          />
        </article>
      </form>
    )
  }
}
