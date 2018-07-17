import React from 'react'
import PropTypes from 'prop-types'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { Button } from 'components/button'
import { isEmpty } from 'lodash'
import { NavLink } from 'react-router-dom'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { getShoppingCartItems } from 'components/shoppingCart/state/selectors'
import { connect } from 'react-redux'

import './styles.scss'

const Cart = ({ shoppingCartItems }) => {
  const renderCheckoutButton = () => {
    if (!isEmpty(shoppingCartItems)) {
      return (
        <NavLink to="/checkout">
          <Button>
            Checkout
          </Button>
        </NavLink>)
    }
    return null
  }

  return (
    <div className="sp-cart sp-page">
      <Container type={CONTAINER_TYPE.TOP_LEFT}>
        <PageHeader>Shopping Cart</PageHeader>
        <div className="sp-cart__body">
          <div className="sp-cart__left">
            <ShoppingCartList />
          </div>
          <div className="sp-cart__right">
            {renderCheckoutButton()}
          </div>
        </div>
      </Container>
    </div>
  )
}

Cart.propTypes = {
  shoppingCartItems: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
  }
}

export default connect(mapStateToProps, null)(Cart)
