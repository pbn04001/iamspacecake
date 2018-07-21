import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { getThumbnail } from 'utils/images'
import { Card } from 'components/container'
import { removeItemFromShoppingCart } from 'views/cart/state/actions'
import { regularPrice } from '../../utils/price'

import './styles.scss'

class ShoppingCartList extends Component {
  static propTypes = {
    shoppingCartItems: PropTypes.array.isRequired,
    removeItemFromShoppingCart: PropTypes.func.isRequired,
  }

  checkShoppingCartItems = () => {
    const { shoppingCartItems } = this.props
    if (isEmpty(shoppingCartItems)) {
      return 'SHOPPING CART IS EMPTY'
    }
    return this.renderShoppingCartItems(shoppingCartItems)
  }

  renderShoppingCartItems = shoppingCartItems => shoppingCartItems.map((item) => {
    const {
      title, price, nid, uuid, quantity,
    } = item
    return (
      <Card className="sp-shopping-cart__item" key={`sp-shopping-cart-list-item-${uuid}`}>
        <div className="sp-shopping-cart__image">
          <NavLink to={`/product/${nid}`}>
            {getThumbnail(item, title)}
          </NavLink>
        </div>
        <div className="sp-shopping-cart__content">
          <span className="sp-shopping-cart__title">{title}</span>
          <span className="sp-shopping-cart__quantity">
            QUANTITY:
            <span className="sp-shopping-cart__quantity--value">{quantity}</span>
          </span>
          <button
            type="button"
            className="sp-shopping-cart__remove sp-button__tertiary"
            onClick={() => this.props.removeItemFromShoppingCart(item)}
          >
            REMOVE
          </button>
        </div>
        <span className="sp-shopping-cart__price">{regularPrice(price)}</span>
      </Card>)
  })

  render() {
    return (
      <div className="sp-shopping-cart">
        {this.checkShoppingCartItems()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { removeItemFromShoppingCart },
  dispatch,
)

export default connect(null, mapDispatchToProps)(ShoppingCartList)
