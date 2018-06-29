import { combineReducers } from 'redux'
import nav from '../components/nav/reducers'
import news from '../components/news/state/reducers'
import products from '../components/products/state/reducers'

const appReducer = combineReducers({
  nav,
  news,
  products,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
