import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../Actions/User'

import UserInfo from './UserInfo'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'

class Header extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    onLogout: React.PropTypes.func
  }
  static mapStateToProps = state => ({
    user: state.User.user,
    loggedIn: !!state.User.token
  })

  static mapDispatchToProps = dispatch => ({
    onLogout() {
      dispatch(actions.Logout())
    }
  })

  constructor() {
    super()
    this.state = { drawer: false }
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={250}
          open={this.state.drawer && this.props.loggedIn}
          onRequestChange={drawer => this.setState({ drawer })}
        >
          <UserInfo user={this.props.user} />
          <Divider />
          <MenuItem onTouchTap={this.props.onEdit}>Edit User</MenuItem>
          <MenuItem onTouchTap={this.props.onLogout}>Logout</MenuItem>
        </Drawer>
        <AppBar
          title="React Skeleton"
          onLeftIconButtonTouchTap={() =>
            this.setState({ drawer: !this.state.drawer })}
        />
      </div>
    )
  }
}

export default connect(Header.mapStateToProps, Header.mapDispatchToProps)(
  Header
)
