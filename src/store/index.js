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

if (__DEBUG__) {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

const persistedShoppingCart = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : null
if (persistedShoppingCart) {
  initialState.cart = persistedShoppingCart;
}

const store = createStore(rootReducer, initialState, composedEnhancers)

store.subscribe(() => {
  localStorage.setItem('shoppingCart', JSON.stringify(store.getState().cart))
})

export default store
