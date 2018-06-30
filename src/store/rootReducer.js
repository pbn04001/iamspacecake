import { combineReducers } from 'redux'
import nav from 'components/nav/reducers'
import news from 'components/news/state/reducers'
import products from 'components/products/state/reducers'
import shoppingCart from 'components/shoppingCart/state/reducers'

const appReducer = combineReducers({
  nav,
  news,
  products,
  shoppingCart,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
