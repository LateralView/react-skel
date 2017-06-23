import { types } from '../Actions/User'

export default class {
  constructor(key) {
    this.key = key
  }

  InitialState() {
    const state = localStorage.getItem(this.key)
    if (state) {
      try {
        let parsedState = JSON.parse(state)
        return {
          User: parsedState
        }
      } catch (e) {
        return {}
      }
    } else return {}
  }

  Middleware() {
    return store => next => action => {
      if (action.type === types.AUTHENTICATE_INTENT_RESOLVED) {
        let result = next(action)
        localStorage.setItem(this.key, JSON.stringify(store.getState().User))
        return result
      } else if (action.type === types.LOGOUT_INTENT) {
        let result = next(action)
        localStorage.removeItem(this.key)
        return result
      } else return next(action)
    }
  }
}
