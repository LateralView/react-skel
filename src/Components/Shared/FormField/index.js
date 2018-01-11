import React from 'react'
import PropTypes from 'prop-types'
import { Form, Label } from 'semantic-ui-react'

export default class FormField extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    errorText: PropTypes.string
  }

  static defaultProps = {
    color: 'red',
    errorText: ''
  }

  render() {
    const { children, color, errorText } = this.props

    return (
      <Form.Field>
        {children}

        {!!errorText && (
          <Label basic color={color} pointing>
            {errorText}
          </Label>
        )}
      </Form.Field>
    )
  }
}
