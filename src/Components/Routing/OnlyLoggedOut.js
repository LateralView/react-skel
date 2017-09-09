import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const onlyLoggedOut = ({ component: Component, user: User, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !User.token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )}
  />
)

onlyLoggedOut.propTypes = {
  component: PropTypes.func,
  user: PropTypes.object,
  location: PropTypes.any
}

export default onlyLoggedOut
