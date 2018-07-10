import React from 'react'
import PropTypes from 'prop-types'
import { Container, Card } from 'components/container'
import { PageHeader } from 'components/typography'
import { Button } from 'components/button'
import { isEmpty } from 'lodash'
import { NavLink } from 'react-router-dom'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { getShoppingCartItems } from 'components/shoppingCart/state/selectors'
import { connect } from 'react-redux'

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
    <div className="sp-page-cart">
      <Container>
        <PageHeader>Shopping Cart</PageHeader>
        <Card>
          <ShoppingCartList />
          {renderCheckoutButton()}
        </Card>
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
