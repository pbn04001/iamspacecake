import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getShoppingCartCount } from './state/selectors'

export class ShoppingCartIcon extends Component {
  getShoppingCartCount = () => this.props.shoppingCartCount

  render() {
    return (
      <Link
        to="/cart"
        className="sp-shopping-cart"
        title="View shopping cart"
      >
        Cart ({ this.getShoppingCartCount() })
      </Link>)
  }
}

ShoppingCartIcon.propTypes = {
  shoppingCartCount: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    shoppingCartCount: getShoppingCartCount(state),
  }
}

export default connect(mapStateToProps, null)(ShoppingCartIcon)
