import React from 'react'
import fetch from 'isomorphic-fetch'
import Header from './header/header.jsx'
import Nav from './nav/nav.jsx'
import Home from './home/home.jsx'
import { Switch, Route } from 'react-router-dom'
import store from '../redux/configureStore'
import { Provider } from 'react-redux'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = { items: [] }
  }

  // componentDidMount() {
  //   fetch(`/rest/node/1?_format=hal_json`)
  //     .then((response) => {
  //       console.log(1)
  //       return response.json()
  //     })
  //     .then((responseJson) => {
  //       console.log(responseJson)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }


  render() {
    return (
      <Provider store={store}>
        <div>
          <Header></Header>
          <Nav></Nav>
          <Switch>
            <Route path='/' component={Home}></Route>
          </Switch>
        </div>
      </Provider>
    )
  }
}