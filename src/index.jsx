import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import store, { history } from 'store'

import { PublicRoutes } from './routes'

import './styles/main.scss'
import './styles/components/modal.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <PublicRoutes />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
