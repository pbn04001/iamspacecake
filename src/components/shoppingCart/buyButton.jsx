import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Button } from 'components/button'
import { addItemToShoppingCart } from 'views/cart/state/actions'
import { getShoppingCartItems } from 'views/cart/state/selectors'

class BuyButton extends Component {
  executeCartAction = (item, isItemAlreadyInCart) => {
    if (isItemAlreadyInCart) {
      this.props.history.push('/cart')
    } else {
      this.props.addItemToShoppingCart(item)
      this.props.history.push('/cart')
    }
  }

  isItemAlreadyInCart = (item) => {
    const { shoppingCartItems } = this.props
    let isItemAlreadyInCart = false
    Object.keys(shoppingCartItems)
      .forEach((key) => {
        const shoppingCartItem = shoppingCartItems[key]
        if (shoppingCartItem.uuid === item.uuid) {
          isItemAlreadyInCart = shoppingCartItem.quantity > 0
        }
      })
    return isItemAlreadyInCart
  }

  render() {
    const { item } = this.props
    const isItemAlreadyInCart = this.isItemAlreadyInCart(item)
    return (
      <Button
        className="sp-buy-button"
        onClick={() => this.executeCartAction(item, isItemAlreadyInCart)}
      >
        {isItemAlreadyInCart ? 'View Cart' : 'Buy Now'}
      </Button>)
  }
}

BuyButton.propTypes = {
  addItemToShoppingCart: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  shoppingCartItems: PropTypes.array.isRequired,
  history: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { addItemToShoppingCart },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BuyButton))
