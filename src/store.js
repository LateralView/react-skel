import Saga from './Sagas'
import Reducers from './Reducers'
import createSagaMiddleware from 'redux-saga'
import UserStorage from './Middlewares/UserStorage'
import { createStore, applyMiddleware, compose } from 'redux'

const UserStorageMiddleware = new UserStorage('__USER__')
const sagaMiddleware = createSagaMiddleware()
const composeEnhanced =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

export default () => {
  const store = createStore(
    Reducers,
    UserStorageMiddleware.InitialState(),
    composeEnhanced(
      applyMiddleware(sagaMiddleware, UserStorageMiddleware.Middleware())
    )
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./Reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  sagaMiddleware.run(Saga)
  return store
}
