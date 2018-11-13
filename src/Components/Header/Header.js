import React from 'react'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import AppBar from 'react-toolbox/lib/app_bar'
import Drawer from 'react-toolbox/lib/drawer'
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu'

import style from './style.scss'

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
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.editUser = this.editUser.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleDrawer() {
    this.setState({ drawer: !this.state.drawer })
  }

  editUser() {
    this.toggleDrawer()
    // TODO: implement
    // this.props.onEdit()
  }

  logout() {
    this.toggleDrawer()
    this.props.onLogout()
  }

  render() {
    return (
      <div className={style.headerWrapper}>
        <Drawer active={this.state.drawer} onOverlayClick={this.toggleDrawer}>
          <UserInfo user={this.props.user} />
          <MenuDivider />
          <MenuItem onClick={this.editUser}>Edit User</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Drawer>
        <AppBar
          title="React Skeleton"
          leftIcon={this.props.loggedIn ? 'menu' : null}
          onLeftIconClick={this.toggleDrawer}
        />
      </div>
    )
  }
}
