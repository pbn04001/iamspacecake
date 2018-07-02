import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import store, { history } from 'store'
import { PublicRoutes } from './routes'

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <PublicRoutes />
    </Router>
  </Provider>
)

export default Root
