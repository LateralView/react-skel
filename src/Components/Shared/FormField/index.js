import React from 'react'
import PropTypes from 'prop-types'
import { Form, Label } from 'semantic-ui-react'
import style from './style.scss'

export default class FormField extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    errorText: PropTypes.any,
    pointing: PropTypes.string
  }

  static defaultProps = {
    color: 'red',
    errorText: '',
    pointing: 'above'
  }

  render() {
    const { children, color, errorText, pointing } = this.props

    return (
      <Form.Field className={`${style.field} ${style[pointing]}`}>
        {children}

        {!!errorText && (
          <Label
            basic
            color={color}
            pointing={pointing}
            className={style.label}
          >
            {errorText}
          </Label>
        )}
      </Form.Field>
    )
  }
}
