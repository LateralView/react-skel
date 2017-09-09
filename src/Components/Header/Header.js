import React from 'react'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import AppBar from 'react-toolbox/lib/app_bar'
import Drawer from 'react-toolbox/lib/drawer'
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu'

export default class Header extends React.Component {
  static get propTypes() {
    return {
      user: PropTypes.object,
      loggedIn: PropTypes.bool,
      onEdit: PropTypes.func,
      onLogout: PropTypes.func
    }
  }

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
