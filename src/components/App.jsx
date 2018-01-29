import React from 'react'
import fetch from 'isomorphic-fetch'
import Header from './Header.jsx'
import Nav from './Nav.jsx'

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
      <div>
        <Header></Header>
        <Nav></Nav>
      </div>
    )
  }
}