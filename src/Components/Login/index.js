import style from './style.scss'
import React from 'react'
import LoginForm from './LoginForm'
import { push } from 'react-router-redux'
import { actions } from '../../Actions/User'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

class Login extends React.Component {
  static mapStateToProps = () => ({})
  static propTypes = {
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
  }
  static mapDispatchToProps = dispatch => ({
    onLogin({ email, password }) {
      dispatch(actions.Authenticate(email, password))
    },
    onRegister() {
      dispatch(push('/register'))
    }
  })

  render() {
    return (
      <div className={style.parentView}>
        <Card>
          <CardTitle title="Login" subtitle="Log in With your SKEL Account" />
          <CardText>
            <LoginForm
              onSubmit={this.props.onLogin}
              onRegisterPressed={this.props.onRegister}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(Login.mapStateToProps, Login.mapDispatchToProps)(Login)
