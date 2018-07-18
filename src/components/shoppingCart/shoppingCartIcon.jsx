import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { getShoppingCartItems } from './state/selectors'

export class ShoppingCartIcon extends Component {
  getShoppingCartCount = (items) => {
    return items.length > 0 ? `(${items.length})` : null
  }

  render() {
    const { shoppingCartItems } = this.props
    return (
      <NavLink
        to="/cart"
        className="sp-shopping-cart"
        title="View shopping cart"
      >
        CART {this.getShoppingCartCount(shoppingCartItems)}
      </NavLink>)
  }
}

ShoppingCartIcon.propTypes = {
  shoppingCartItems: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
  }
}

export default connect(mapStateToProps, null)(ShoppingCartIcon)
