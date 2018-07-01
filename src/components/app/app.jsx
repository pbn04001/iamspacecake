import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Home from 'views/home/home'
import Cart from 'views/cart/cart'
import Header from '../header/header'
import Nav from '../nav/nav'

import * as actionCreators from './actions'

let isStopMenuDeactivate = false

class App extends React.Component {
  menuClicked = () => {
    isStopMenuDeactivate = true
  }

  screenClicked = () => {
    if (!isStopMenuDeactivate) {
      this.props.setMenuActive(false)
    }
    isStopMenuDeactivate = false
  }

  render() {
    return (
      <div // eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        onClick={event => this.screenClicked(event)}
      >
        <Header />
        <Nav menuClicked={() => this.menuClicked()} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  setMenuActive: PropTypes.func.isRequired,
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
