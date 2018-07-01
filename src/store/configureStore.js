import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reduxSagaMiddleware } from './sagas'
import rootReducer from './rootReducer'

export default function configureStore({ initialState } = {}) {
  const sagaMiddleware = reduxSagaMiddleware()
  const middlewares = [thunk, sagaMiddleware]
  const enhancers = applyMiddleware(...middlewares)

  const store = createStore(rootReducer, initialState, enhancers)

  return store
}
