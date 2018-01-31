import { combineReducers } from 'redux'

import nav from '../components/nav/reducers'

const appReducer = combineReducers({
  nav
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
