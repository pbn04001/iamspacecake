import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import mapDispatchToProps from './state/mapDispatchToProps'
import mapStateToProps from './state/mapStateToProps'

export class ShoppingCartIcon extends Component {

  getShoppingCartCount = () => {
    return this.props.shoppingCartCount
  }

  render() {
    return (
      <button
        className='sp-shopping-cart'
        title='View shopping cart'>
          Cart ({this.getShoppingCartCount()})
      </button>)
  }
}

ShoppingCartIcon.propTypes = {
  shoppingCartCount: PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartIcon)