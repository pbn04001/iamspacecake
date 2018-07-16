import 'redux-devtools-extension'
import { applyMiddleware, createStore, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { reduxSagaMiddleware } from './sagas'
import rootReducer from './rootReducer'

export const history = createHistory()
const initialState = {}
const enhancers = []

const sagaMiddleware = reduxSagaMiddleware()
const historyMiddleware = routerMiddleware(history)
const middleware = [historyMiddleware, sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

export default createStore(rootReducer, initialState, composedEnhancers)
