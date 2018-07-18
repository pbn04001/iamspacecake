import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { isEmpty } from 'lodash'
import ShoppingCartList from 'components/shoppingCart/shoppingCartList'
import { getShoppingCartItems, getShoppingCartTotal } from 'components/shoppingCart/state/selectors'
import { connect } from 'react-redux'
import { regularPrice } from 'utils/price'
import { renderPaypalButton } from 'utils/paypal'

import './styles.scss'

class Cart extends Component {
  static propTypes = {
    shoppingCartItems: PropTypes.array.isRequired,
    shoppingCartTotal: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { shoppingCartItems } = this.props
    renderPaypalButton(shoppingCartItems, 'paypal-button', this.purchaseComplete)
  }

  purchaseComplete = (results) => {
    console.log(results)
  }

  cartCount = () => {
    const { shoppingCartItems } = this.props
    return !isEmpty(shoppingCartItems) && `(${shoppingCartItems.length})`
  }

  shoppingCartRight = () => {
    const { shoppingCartItems, shoppingCartTotal } = this.props
    return !isEmpty(shoppingCartItems) && (
      <div className="sp-cart-total">
        <div className="sp-cart-total__title">Summary</div>
        <div className="sp-cart-total__shipping">
          SHIPPING ON ALL ITEMS IS FREE
        </div>
        <div className="sp-cart-total__total">
          TOTAL {regularPrice(shoppingCartTotal)}
        </div>
        <div
          id="paypal-button"
          className="sp-cart-total__paypal-button"
        />
      </div>)
  }

  render() {
    const { shoppingCartItems } = this.props
    return (
      <div className="sp-cart sp-page">
        <Container type={CONTAINER_TYPE.TOP_LEFT}>
          <PageHeader>SHOPPING CART {this.cartCount()}</PageHeader>
          <div className="sp-cart__body">
            <div className="sp-cart__left">
              <ShoppingCartList shoppingCartItems={shoppingCartItems} />
            </div>
            {this.shoppingCartRight()}
          </div>
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
    shoppingCartTotal: getShoppingCartTotal(state),
  }
}

export default connect(mapStateToProps, null)(Cart)
