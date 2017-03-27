import style from './style.scss'
import React from 'react'
import LoginForm from './RegisterForm'
import { goBack } from 'react-router-redux'
import { actions } from '../../Actions/User'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

class Register extends React.Component {
  static mapStateToProps = () => ({})
  static propTypes = {
    onBack: React.PropTypes.func,
    onRegister: React.PropTypes.func
  }
  static mapDispatchToProps = dispatch => ({
    onLogin({email, password}) {
      //dispatch(actions.Authenticate(email, password))
    },
    onBack() {
      dispatch(goBack())
    }
  })

  render() {
    return (
      <div className={style.parentView}>
        <Card>
          <CardTitle 
            title='Register'
            subtitle='Register a New Account'
          />
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

export default connect(Register.mapStateToProps, Register.mapDispatchToProps)(Register)
