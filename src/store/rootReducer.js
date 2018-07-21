import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import api from 'utils/api/state/reducers'
import product from 'views/product/state/reducers'
import shop from 'views/shop/state/reducers'
import app from 'components/app/state/reducers'
import news from 'components/news/state/reducers'
import products from 'components/products/state/reducers'
import cart from 'views/cart/state/reducers'

const appReducer = combineReducers({
  routing: routerReducer,
  api,
  app,
  news,
  products,
  cart,
  product,
  shop,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
