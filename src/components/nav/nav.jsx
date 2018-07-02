import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actionCreators from './state/actions'

class Nav extends Component {
  toggleMenuActive = () => {
    this.props.menuClicked()
    this.props.setMenuActive(!this.props.isMenuActive)
  }

  render() {
    const { location } = this.props
    return (
      <div className="sp-nav-bar">
        <NavLink
          to="/"
          className="sp-logo"
          title="SpaceCake Productions"
        />
        <div className="sp-menu-back-left" />
        <nav className={`sp-location-${location}`}>
          <ul className={this.props.isMenuActive ? 'sp-active' : ''}>
            <button type="button" className="sp-mobile-menu" onClick={() => this.toggleMenuActive()} />
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/news">News</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      </div>)
  }
}

Nav.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
  menuClicked: PropTypes.func.isRequired,
  setMenuActive: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    isMenuActive: state.nav.isMenuActive,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
