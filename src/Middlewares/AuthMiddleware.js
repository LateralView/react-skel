export default class {
  /**
   * Middleware to handle Route Authentication
   * @param {object} store - Redux store
   * @param {string} loggedPath - Path to redirect when logged in
   * @param {string} unloggedPath - Path to redirect when you're unlogged
   * @param {function} loginValidation - Method to know if the user is logged in, has state as first parameter, should return a boolean
   */
  constructor(store, loggedPath, unloggedPath, loginValidation) {
    this._store = store
    this._loggedPath = loggedPath
    this._unloggedPath = unloggedPath
    this._loginValidation = loginValidation
  }

  /**
   * Will redirect out the users when is not logged in
   */
  OnlyLoggedIn() {
    return (nextState, transition, cb) => {
      let isLogged = this._loginValidation.call(this, this._store.getState())
      if (!isLogged) {
        transition(this._unloggedPath)
      }
      cb()
    }
  }

  /**
   * Will Redirect out the users if are logged in
   */
  OnlyLoggedOut() {
    return (nextState, transition, cb) => {
      let isLogged = this._loginValidation.call(this, this._store.getState())
      if (isLogged) {
        transition(this._loggedPath)
      }
      cb()
    }
  }
}