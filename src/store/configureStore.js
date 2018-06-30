import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { reduxSagaMiddleware } from './sagas';
import rootReducer from './rootReducer'

const sagaMiddleware = reduxSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
const enhancers = applyMiddleware(...middlewares)

const store = createStore(rootReducer, {}, enhancers)

export default store;