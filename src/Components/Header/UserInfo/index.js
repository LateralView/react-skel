import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

import Avatar from 'react-toolbox/lib/avatar'
import FontIcon from 'react-toolbox/lib/font_icon'

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
        <div className={style.avatarContainer}>
          <Avatar icon={<FontIcon value="person" />} />
          <div className={style.namesContainer}>
            <p className={style.name}>
              {this.props.user.firstname}
            </p>
            <p className={style.name}>
              {this.props.user.lastname}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
