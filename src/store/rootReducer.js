import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import api from 'utils/api/state/reducers'
import checkout from 'views/checkout/state/reducer'
import product from 'views/product/state/reducers'
import shop from 'views/shop/state/reducers'
import nav from 'components/nav/state/reducers'
import news from 'components/news/state/reducers'
import products from 'components/products/state/reducers'
import shoppingCart from 'components/shoppingCart/state/reducers'

const appReducer = combineReducers({
  routing: routerReducer,
  api,
  checkout,
  nav,
  news,
  products,
  shoppingCart,
  product,
  shop,
  form: formReducer,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
