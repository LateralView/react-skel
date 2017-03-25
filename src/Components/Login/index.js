import style from './style.scss'
import React from 'react'
import LoginForm from './LoginForm'
import { actions } from '../../Actions/User'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

class Login extends React.Component {
  static mapStateToProps = () => ({})
  static propTypes = {
    onLogin: React.PropTypes.func
  }
  static mapDispatchToProps = dispatch => ({
    onLogin({email, password}) {
      dispatch(actions.Authenticate(email, password))
    }
  })

  constructor() {
    super()
    this._submit = this._submit.bind(this)
  }
  
  _submit(data) {
    this.props.onLogin(data)
  }

  render() {
    return (
      <div className={style.parentView}>
        <Card expanded>
          <CardTitle 
            title='Login'
            subtitle='Log in With your SKEL Account'
          />
          <CardText>
            <LoginForm onSubmit={this._submit}></LoginForm>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(Login.mapStateToProps, Login.mapDispatchToProps)(Login)
