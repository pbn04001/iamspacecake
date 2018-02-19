import { combineReducers } from 'redux'
import nav from '../components/nav/reducers'
import news from '../components/news/reducers'

const appReducer = combineReducers({
  nav,
  news
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
