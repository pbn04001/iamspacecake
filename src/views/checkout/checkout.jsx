import React, { Component } from 'react'
import { Container, Card } from 'components/container'
import { PageHeader } from 'components/typography'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'

class Checkout extends Component {
  componentDidMount() {
    window.paypal.Button.render({
      // Configure environment
      env: 'sandbox',
      client: {
        sandbox: 'AfXGU6Y3NfRIMgzA3aH8eqC-lG8bOlRS1FJ8d_xuKwIwhsfHvUJRYNqLMeutskatOOyS333d-Ouokgjp',
      },
      // Customize button (optional)
      locale: 'en_US',
      style: {
        size: 'small',
        color: 'gold',
        shape: 'pill',
      },
      // Set up a payment
      payment: (data, actions) => {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: '0.01',
              currency: 'USD',
            },
          }],
        })
      },
      // Execute the payment
      onAuthorize: (data, actions) => {
        return actions.payment.execute()
          .then(() => {
            // Show a confirmation message to the buyer
            window.alert('Thank you for your purchase!') // eslint-disable-line no-alert
          })
      },
    }, '#paypal-button-checkout')
  }

  render() {
    return (
      <div className="sp-page-checkout">
        <Container>
          <PageHeader>Checkout</PageHeader>
          <Card>
            <ShoppingCartList />
          </Card>
          <div id="paypal-button-checkout" />
        </Container>
      </div>)
  }
}

export default Checkout
