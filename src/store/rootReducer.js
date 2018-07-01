import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import api from 'utils/api/state/reducer'
import nav from 'components/nav/state/reducers'
import news from 'components/news/state/reducers'
import products from 'components/products/state/reducers'
import shoppingCart from 'components/shoppingCart/state/reducers'

const appReducer = combineReducers({
  routing: routerReducer,
  api,
  nav,
  news,
  products,
  shoppingCart,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
