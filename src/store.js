import Reducers from './Reducers'
import UserStorage from './Middlewares/UserStorage'
import { createStore, applyMiddleware, compose } from 'redux'

const UserStorageMiddleware = new UserStorage('__USER__')
const composeEnhanced =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

export default () => {
  const store = createStore(
    Reducers,
    UserStorageMiddleware.InitialState(),
    composeEnhanced(applyMiddleware(UserStorageMiddleware.Middleware()))
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./Reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
