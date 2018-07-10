import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Card } from 'components/container'
import { PageHeader } from 'components/typography'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { completePurchase } from './state/actions'


class Checkout extends Component {
  static propTypes = {
    completePurchase: PropTypes.func.isRequired,
  }


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
        size: 'responsive',
        color: 'blue',
        shape: 'rect',
      },
      // Set up a payment
      payment: (data, actions) => {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: '0.01',
              currency: 'USD',
            },
            item_list: {
              items: [
                {
                  sku: '34543', // Product Id
                  name: 'hat',
                  price: '0.01',
                  currency: 'USD',
                  quantity: '1',
                },
              ],
            },
          }],
        })
      },
      // Execute the payment
      onAuthorize: (data, actions) => {
        return actions.payment.execute()
          .then(() => {
            this.props.completePurchase(data.paymentID)
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

function mapStateToProps(state) {
  return {
    results: state.results,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { completePurchase },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
