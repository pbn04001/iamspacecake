import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from './actions'
import PropTypes from 'prop-types'

class Nav extends Component {

  toggleMenuActive () {
    this.props.menuClicked()
    this.props.setMenuActive(!this.props.isMenuActive)
  }

  render () {
    return (
      <div className='sp-nav-bar'>
        <NavLink to='/'
                 className='sp-logo'
                 title='SpaceCake Productions'/>
        <div className='sp-menu-back-left'></div>
        <nav>
          <ul className={this.props.isMenuActive ? 'sp-active' : ''}>
            <button className={'sp-mobile-menu'} onClick={() => this.toggleMenuActive()}></button>
            <li><NavLink to='/shop'>Shop</NavLink></li>
            <li><NavLink to='/gallery'>Gallery</NavLink></li>
            <li><NavLink to='/news'>News</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
          </ul>
        </nav>
      </div>);
  }
}

Nav.propTypes = {
  isMenuActive: PropTypes.bool,
  menuClicked: PropTypes.func
}

function mapStateToProps (state) {
  return {
    isMenuActive: state.nav.isMenuActive
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)