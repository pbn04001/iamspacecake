import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { withRouter } from 'react-router-dom'
import { Container } from 'components/container'
import { PageHeader } from 'components/typography'
import { regularPrice } from 'utils/price'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'

import {
  getOrderResults,
  getOrderItems,
  getOrderTotal,
} from './state/selectors'

class OrderComplete extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    orderResults: PropTypes.object,
    orderItems: PropTypes.array,
    orderTotal: PropTypes.number,
  }

  componentDidMount() {
    if (!this.props.orderResults) {
      this.props.history.push('/')
    }
  }

  continueShopping = () => {
    this.props.history.push('/shop')
  }

  shoppingCartRight = () => {
    const { orderItems, orderTotal } = this.props
    return !isEmpty(orderItems) && (
      <div className="sp-cart-total">
        <div className="sp-cart-total__title">SHIPPING ADDRESS</div>
        <div className="sp-cart-total__shipping">
          {this.renderShippingAddress()}
        </div>
        <div className="sp-cart-total__total">
          ORDER TOTAL {regularPrice(orderTotal)}
        </div>
      </div>)
  }

  renderShippingAddress = () => {
    const shippingAddress = get(this.props.orderResults, 'results.payer.payer_info.shipping_address')
    if (shippingAddress) {
      return (
        <div className="sp-cart__shipping_address">
          <span className="sp-cart__address-line">{shippingAddress.recipient_name}</span>
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
            {shippingAddress.city}, { shippingAddress.state } { shippingAddress.postal_code }
          </span>
        </div>
      )
    }
  }

  render() {
    const noRemove = true
    return (
      <div className="sp-order-complete sp-page">
        <Container>
          <PageHeader>ORDER COMPLETE</PageHeader>
          <div className="sp-page__body">
            Thank you for placing your order with Space Cake Productions.
          </div>
          <div className="sp-cart__body">
            <div className="sp-cart__left">
              <ShoppingCartList shoppingCartItems={this.props.orderItems} noRemove={noRemove} />
            </div>
            {this.shoppingCartRight()}
          </div>
          <button
            className="sp-button"
            onClick={this.continueShopping}
          >
            CONTINUE SHOPPING
          </button>
        </Container>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    orderResults: getOrderResults(state),
    orderItems: getOrderItems(state),
    orderTotal: getOrderTotal(state),
  }
}

export default connect(mapStateToProps)(withRouter(OrderComplete))