import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './components/app/app.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/configureStore'
import { Provider } from 'react-redux'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'))