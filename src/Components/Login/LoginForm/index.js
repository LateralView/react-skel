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
          return validateEmail(value)

        case 'password':
          return validatePassword(value)

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
    return (
      this.state.formData.email &&
      validateEmail(this.state.formData.email) &&
      this.state.formData.password &&
      validatePassword(this.state.formData.password)
    )
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
      <section>
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
            >
              <Icon name="at" />
              <input />
            </Input>
            {!formValidations.email && (
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
              error={!formValidations.password}
              onBlur={this.validations}
            >
              <Icon name="at" />
              <input />
            </Input>
            {!formValidations.password && (
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
      </section>
    )
  }
}
