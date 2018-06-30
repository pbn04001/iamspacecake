import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getShoppingCartCount } from './state/selectors';

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

function mapStateToProps(state) {
  return {
    shoppingCartCount: getShoppingCartCount(state)
  }
}

export default connect(mapStateToProps, null)(ShoppingCartIcon)