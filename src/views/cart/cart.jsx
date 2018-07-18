import React from 'react'
import PropTypes from 'prop-types'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { isEmpty } from 'lodash'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { getShoppingCartItems, getShoppingCartTotal } from 'components/shoppingCart/state/selectors'
import { connect } from 'react-redux'
import { regularPrice } from 'utils/price'

import './styles.scss'

const Cart = ({ shoppingCartItems, shoppingCartTotal }) => {
  const cartCount = () => {
    return !isEmpty(shoppingCartItems) && `(${shoppingCartItems.length})`
  }

  const shoppingCartRight = () => {
    return !isEmpty(shoppingCartItems) && (
      <div className="sp-cart-total">
        <div className="sp-cart-total__title">Summary</div>
        <div className="sp-cart-total__shipping">
          Shipping is free on all purchases
        </div>
        <div className="sp-cart-total__total">
          Total {regularPrice(shoppingCartTotal)}
        </div>
      </div>)
  }

  return (
    <div className="sp-cart sp-page">
      <Container type={CONTAINER_TYPE.TOP_LEFT}>
        <PageHeader>Shopping Cart {cartCount}</PageHeader>
        <div className="sp-cart__body">
          <div className="sp-cart__left">
            <ShoppingCartList shoppingCartItems={shoppingCartItems} />
          </div>
          {shoppingCartRight()}
        </div>
      </Container>
    </div>
  )
}

Cart.propTypes = {
  shoppingCartItems: PropTypes.array.isRequired,
  shoppingCartTotal: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
    shoppingCartTotal: getShoppingCartTotal(state),
  }
}

export default connect(mapStateToProps, null)(Cart)
