import React from 'react'
import Header from '../header/header.jsx'
import Nav from '../nav/nav.jsx'
import Home from '../../views/home/home.jsx'
import { Switch, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions'
import PropTypes from 'prop-types'

let isStopMenuDeactivate = false

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isStopMenuDeactivate: false
    }
  }

  menuClicked () {
    isStopMenuDeactivate = true
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

  screenClicked() {
    if (!isStopMenuDeactivate) {
      this.props.setMenuActive(false)
    }
    isStopMenuDeactivate = false
  }

  render() {
    return (
      <div onClick={() => this.screenClicked(event)}>
        <Header></Header>
        <Nav menuClicked={() => this.menuClicked()}></Nav>
        <Switch>
          <Route path='/' component={Home}></Route>
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  menuClicked: PropTypes.func
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)