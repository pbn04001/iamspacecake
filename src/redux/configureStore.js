import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'

const middleware = applyMiddleware(thunk)

const store = middleware(createStore)(rootReducer, {})

export default store;