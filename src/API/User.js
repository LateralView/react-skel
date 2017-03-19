import { METHODS, HeaderFactory } from './utils'

/**
 * Authenticate into the application
 * @param {string} email - Email to log into the application
 * @param {string} password - Password to log into the application
 */
export const Authenticate = (email, password) => {
  return fetch(`${process.env.API_URL}/users/authenticate`, {
    method: METHODS.POST,
    headers: HeaderFactory(),
    body: JSON.stringify({email, password})
  })
}

/**
 * Create A New User
 * @param {Object} user - User Data to Create
 */
export const Create = user => {
  return fetch(`${process.env.API_URL}/users`, {
    method: METHODS.POST,
    headers: HeaderFactory(),
    body: JSON.stringify(user)
  })
}

/**
 * Update the user information
 * @param {Object} user - User data to Update
 * @param {string} token - Token to authenticate
 */
export const Update = (user, token) => {
  return fetch(`${process.env.API_URL}/user`, {
    method: METHODS.POST,
    headers: HeaderFactory(token),
    body: JSON.stringify(user)
  })
}

/**
 * Activate the account
 * @param {string} token - Token Issued to activate the account
 */
export const Activate = token => {
  return fetch(`${process.env.API_URL}/users/activate`, {
    method: METHODS.POST,
    headers: HeaderFactory(),
    body: JSON.stringify({
      activation_token: token
    })
  })
}