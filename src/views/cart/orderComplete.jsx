import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { withRouter } from 'react-router-dom'
import { Container } from 'components/container'
import { PageHeader } from 'components/typography'
import { regularPrice } from 'utils/price'
import { Button } from 'components/button/button'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'

import {
  getOrderResults,
} from './state/selectors'

class OrderComplete extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    orderResults: PropTypes.object,
  }

  continueShopping = () => {
    this.props.history.push('/')
  }

  shoppingCartRight = (orderResults) => {
    const { items, total, results } = orderResults
    return !isEmpty(items) && (
      <div className="sp-cart-total">
        <div className="sp-cart-total__title">SHIPPING ADDRESS</div>
        <div className="sp-cart-total__shipping">
          {this.renderShippingAddress(results)}
        </div>
        <div className="sp-cart-total__total">
          ORDER TOTAL {regularPrice(total)}
        </div>
      </div>)
  }

  renderShippingAddress = (results) => {
    const shippingAddress = get(results, 'payer.payerInfo.shippingAddress')
    if (shippingAddress) {
      return (
        <div className="sp-cart__shipping_address">
          <span className="sp-cart__address-line">{shippingAddress.recipientName}</span>
          {!!shippingAddress.line1 && (
            <span className="sp-cart__address-line">{shippingAddress.line1}</span>
          )}
          {!!shippingAddress.line2 && (
            <span className="sp-cart__address-line">{shippingAddress.line2}</span>
          )}
          {!!shippingAddress.line3 && (
            <span className="sp-cart__address-line">{shippingAddress.line3}</span>
          )}
          <span className="sp-cart__address-line">
            {shippingAddress.city}, { shippingAddress.state } { shippingAddress.postalCode }
          </span>
        </div>
      )
    }
    return null
  }

  render() {
    const noRemove = true
    const { orderResults } = this.props
    if (!orderResults) {
      this.props.history.push('/')
      return null
    }
    return (
      <div className="sp-order-complete sp-page">
        <Container>
          <PageHeader>ORDER COMPLETE</PageHeader>
          <div className="sp-page__body">
            Thank you for placing your order with Space Cake Productions.<br />
            You should receive an email from PayPal about your order sent to this address: {orderResults.results.payer.payerInfo.email}
          </div>
          <div className="sp-cart__body">
            <div className="sp-cart__left">
              <ShoppingCartList shoppingCartItems={this.props.orderResults.items} noRemove={noRemove} />
            </div>
            {this.shoppingCartRight(orderResults)}
          </div>
          <Button
            onClick={this.continueShopping}
          >
            CONTINUE SHOPPING
          </Button>
        </Container>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    orderResults: getOrderResults(state),
  }
}

export default connect(mapStateToProps)(withRouter(OrderComplete))
