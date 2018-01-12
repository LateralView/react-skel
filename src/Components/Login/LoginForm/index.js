import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Icon } from 'semantic-ui-react'

import style from './style.scss'
import {
  validateEmail,
  validatePassword
} from '../../../Shared/Utils/validations'
import FormField from '../../Shared/FormField'

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
      },
      formValidations: {
        ...this.state.formValidations,
        [e.target.name]: this.validations(e)
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

    return validation()
  }

  isValid = () => {
    const error = Object.values(this.state.formValidations).some(
      el => el === false
    )

    return !error
  }

  submit = e => {
    e.preventDefault()
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
      <form onSubmit={this.submit} noValidate>
        <article>
          <FormField
            errorText={
              formValidations.email === false ? `This is not a valid email` : ''
            }
          >
            <Input
              iconPosition="left"
              placeholder="Complete it with your email account"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={formValidations.email === false}
            >
              <Icon name="at" />
              <input />
            </Input>
          </FormField>
          <FormField
            errorText={
              formValidations.password === false
                ? `The password is too short`
                : ''
            }
          >
            <Input
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              hint="Complete it with your password"
              value={password}
              onChange={this.handleChange}
              error={formValidations.password === false}
            >
              <Icon name="key" />
              <input />
            </Input>
          </FormField>
        </article>

        <article className={style.buttonContainer}>
          <Button
            content="Register New Account"
            onClick={this.props.onRegisterPressed}
            type="button"
          />
          <Button
            content="Log In"
            disabled={!this.isValid()}
            type="submit"
            primary
          />
        </article>
      </form>
    )
  }
}
