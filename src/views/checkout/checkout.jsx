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
import { startPurchase, purchaseComplete } from './state/actions'

class Checkout extends Component {
  static propTypes = {
    startPurchase: PropTypes.func.isRequired,
    purchaseComplete: PropTypes.func.isRequired,
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

  mapShoppingCartItemsList = (shoppingCartItems) => {
    let total = 0
    const items = shoppingCartItems.map((item) => {
      total += (item.price * item.quantity)
      return {
        sku: item.nid, // Product Id
        name: item.title,
        price: `${item.price}`,
        currency: 'USD',
        quantity: item.quantity,
      }
    })
    return {
      items,
      total,
    }
  }

  renderPayButton = (shoppingCartItems) => {
    const itemsList = this.mapShoppingCartItemsList(shoppingCartItems)
    window.paypal.Button.render({
      // Configure environment
      env: process.env.PAY_PAL_ENVIRONMENT,
      // Customize button (optional)
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'blue',
        shape: 'rect',
      },
      // Set up a payment
      payment: (data, actions) => {
        this.props.startPurchase()
        return actions.request({
          method: 'post',
          url: `${process.env.NODE_ENDPOINT}/product/create-payment`,
          json: {
            items: itemsList.items,
            total: itemsList.total,
          },
        })
          .then(res => res.id)
      },
      // Execute the payment
      onAuthorize: (data, actions) => {
        return actions.request({
          method: 'post',
          url: `${process.env.NODE_ENDPOINT}/product/execute-payment`,
          json: {
            paymentId: data.paymentID,
            payerId: data.payerID,
          },
        })
          .then((results) => {
            this.props.purchaseComplete(results)
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
  { startPurchase, purchaseComplete },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
