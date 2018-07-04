import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getShoppingCartItems } from './state/selectors'

const ShoppingCartList = ({ shoppingCartItems }) => {
  return shoppingCartItems.map(item => (
    <div className="sp-shopping-cart-item" key={`sp-shopping-cart-list-item-${item.uuid[0].value}`}>
      {item.title[0].value} count({item.count})
    </div>))
}

ShoppingCartList.propTypes = {
  shoppingCartItems: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
  }
}

export default connect(mapStateToProps, null)(ShoppingCartList)
