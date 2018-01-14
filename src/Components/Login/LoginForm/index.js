import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Icon } from 'semantic-ui-react'
import { debounce } from 'underscore'

// Local dependencies
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
      formValidations: {
        email: true,
        password: true
      }
    }
  }

  handleChange = e => {
    e.persist()
    const value =
      e.target.type === 'number' && e.target.value
        ? Number(e.target.value)
        : e.target.value

    this.setState(
      {
        ...this.state,
        formData: {
          ...this.state.formData,
          [e.target.name]: value
        }
      },
      () => this.validations(e)
    )
  }

  validations = debounce(e => {
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
        [e.target.name]: validation()
      }
    })
  }, 450)

  isValid = () => {
    const fieldsError = Object.values(this.state.formValidations).some(
      el => el === false
    )
    const { email, password } = this.state.formData
    const fieldsRequired = email && password

    return !fieldsError && fieldsRequired
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
        <div>
          <FormField
            errorText={!formValidations.email && `This is not a valid email`}
          >
            <Input
              iconPosition="left"
              placeholder="Complete it with your email account"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={!formValidations.email}
              fluid
            >
              <Icon name="at" />
              <input />
            </Input>
          </FormField>

          <FormField
            errorText={!formValidations.password && `The password is too short`}
          >
            <Input
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              hint="Complete it with your password"
              value={password}
              onChange={this.handleChange}
              error={!formValidations.password}
              fluid
            >
              <Icon name="key" />
              <input />
            </Input>
          </FormField>
        </div>

        <div className={style.buttonContainer}>
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
        </div>
      </form>
    )
  }
}
