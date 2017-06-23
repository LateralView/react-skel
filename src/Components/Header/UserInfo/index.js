import React from 'react'
import PropTypes from 'prop-types'
import mdl from 'material-icons/css/material-icons.css'

import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import ListItem from 'material-ui/List/ListItem'

import style from './style.scss'

export default class UserInfo extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {
    user: {}
  }

  render() {
    return (
      <div className={style.parentContainer}>
        <ListItem
          disabled={true}
          leftAvatar={
            <div className={style.avatarContainer}>
              <Avatar
                icon={<FontIcon className={`${mdl.mi} ${mdl.miPerson}`} />}
              />
              <div className={style.namesContainer}>
                <p className={style.name}>{this.props.user.firstname}</p>
                <p className={style.name}>{this.props.user.lastname}</p>
              </div>
            </div>
          }
        />
      </div>
    )
  }
}
