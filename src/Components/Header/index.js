import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from '../../Actions/User'

import UserInfo from './UserInfo'

import AppBar from 'react-toolbox/lib/app_bar'
import Drawer from 'react-toolbox/lib/drawer'
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu'

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    loggedIn: PropTypes.bool,
    onEdit: PropTypes.func,
    onLogout: PropTypes.func
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
          active={this.state.drawer}
          onOverlayClick={() => this.setState({ drawer: !this.state.drawer })}
        >
          <UserInfo user={this.props.user} />
          <MenuDivider />
          <MenuItem onClick={this.props.onEdit}>Edit User</MenuItem>
          <MenuItem onClick={this.props.onLogout}>Logout</MenuItem>
        </Drawer>
        <AppBar
          title="React Skeleton"
          leftIcon={this.props.loggedIn ? 'menu' : null}
          onLeftIconClick={() => this.setState({ drawer: !this.state.drawer })}
        />
      </div>
    )
  }
}

export default connect(Header.mapStateToProps, Header.mapDispatchToProps)(
  Header
)
