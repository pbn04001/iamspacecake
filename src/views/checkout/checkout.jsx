import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import { Container, Card } from 'components/container'
import { PageHeader } from 'components/typography'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { getShoppingCartItems } from 'components/shoppingCart/state/selectors'
import { completePurchase } from './state/actions'


class Checkout extends Component {
  static propTypes = {
    completePurchase: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    shoppingCartItems: PropTypes.array.isRequired,
    orderProcessing: PropTypes.bool.isRequired,
    orderResults: PropTypes.object,
  }

  componentDidMount() {
    const { shoppingCartItems, history } = this.props
    if (isEmpty(shoppingCartItems)) {
      history.goBack()
    } else {
      this.renderPayButton(shoppingCartItems)
    }
  }

  getShoppingCartBody = () => {
    if (this.props.orderResults) {
      if (this.props.orderResults.success) {
        return (
          <div>
            Order Complete
          </div>)
      }
      return (
        <div>
          Error occurred placing order
        </div>
      )
    }
    if (this.props.orderProcessing) {
      return (
        <div className="sp-checkout-processing-order">
          ...Processing Order
        </div>)
    }
    return (
      <Fragment>
        <ShoppingCartList />
        <div id="paypal-button-checkout" />
      </Fragment>)
  }

  mapShoppingCartItems = (shoppingCartItems) => {
    let total = 0
    const items = shoppingCartItems.map((item) => {
      total += (item.price * item.count)
      return {
        sku: item.nid, // Product Id
        name: item.title,
        price: `${item.price}`,
        currency: 'USD',
        quantity: item.count,
      }
    })
    return {
      items,
      total,
    }
  }

  renderPayButton = (shoppingCartItems) => {
    const items = this.mapShoppingCartItems(shoppingCartItems)
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
              total: `${items.total}`,
              currency: 'USD',
            },
            item_list: {
              items: items.items,
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
            {this.getShoppingCartBody()}
          </Card>
        </Container>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    orderResults: state.checkout.orderResults,
    orderProcessing: state.checkout.orderProcessing,
    shoppingCartItems: getShoppingCartItems(state),
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { completePurchase },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
