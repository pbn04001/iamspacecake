import React from 'react'
import { Container, Card } from 'components/container'
import { PageHeader } from 'components/typography'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'

const Checkout = () => (
  <div className="sp-page-checkout">
    <Container>
      <PageHeader>Checkout</PageHeader>
      <Card>
        <ShoppingCartList />
      </Card>
    </Container>
  </div>
)

export default Checkout
