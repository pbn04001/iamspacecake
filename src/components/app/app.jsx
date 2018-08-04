import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../header/header'
import Nav from '../nav/nav'
import Footer from '../footer/footer'
import { setMenuActive } from './state/actions'

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
    const { children, location } = this.props
    return (
      <div // eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        className="sp-app-container"
        onClick={event => this.screenClicked(event)}
      >
        { __DEBUG__ && (<div className="sp-not-production">{process.env.NODE_ENV}</div>)}
        <Header />
        <Nav location={location} menuClicked={() => this.menuClicked()} />
        { children }
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  setMenuActive: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps() {
  return {}
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { setMenuActive },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
