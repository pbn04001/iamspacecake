import React from 'react'
import fetch from 'isomorphic-fetch'
import '../styles/main.scss'
import Header from './Header.jsx'

export default class App extends React.Component {

  constructor() {
    super();
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
      <Header></Header>
    )
  }
}