import React from 'react'
import { Container, Card } from 'components/container'
import { PageHeader } from 'components/typography'
import { Button } from 'components/button'
import { NavLink } from 'react-router-dom'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'

const Cart = () => (
  <div className="sp-page-cart">
    <Container>
      <PageHeader>Shopping Cart</PageHeader>
      <Card>
        <ShoppingCartList />
        <NavLink to="/checkout">
          <Button>
            Checkout
          </Button>
        </NavLink>
      </Card>
    </Container>
  </div>
)

export default Cart
