import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { getShoppingCartItems } from './state/selectors'

const ShoppingCartList = ({ shoppingCartItems }) => {
  const renderShoppingCartItems = () => shoppingCartItems.map(item => (
    <div className="sp-shopping-cart-item" key={`sp-shopping-cart-list-item-${item.uuid}`}>
      {item.title}
      <span className="sp-shopping-cart-item-qty">({item.quantity})</span>
    </div>))

  const checkShoppingCartItems = () => {
    if (isEmpty(shoppingCartItems)) {
      return 'Shopping cart is empty'
    }
    return renderShoppingCartItems()
  }

  return checkShoppingCartItems()
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
