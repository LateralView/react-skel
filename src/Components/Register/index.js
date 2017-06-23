import style from './style.scss'
import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './RegisterForm'
import { withRouter } from 'react-router-dom'
import { actions } from '../../Actions/User'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

class Register extends React.Component {
  static mapStateToProps = () => ({})
  static propTypes = {
    onBack: PropTypes.func,
    onRegister: PropTypes.func,
    history: PropTypes.object.isRequired
  }
  static mapDispatchToProps = dispatch => ({
    onRegister({ email, password, firstname, lastname }) {
      dispatch(actions.UserCreate(email, password, firstname, lastname))
    },
    onBack() {
      dispatch(this.props.history.goBack())
    }
  })

  render() {
    return (
      <div className={style.parentView}>
        <Card>
          <CardTitle title="Register" subtitle="Register a New Account" />
          <CardText>
            <LoginForm
              onBack={this.props.onBack}
              onSubmit={this.props.onRegister}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect(Register.mapStateToProps, Register.mapDispatchToProps)(Register)
)
