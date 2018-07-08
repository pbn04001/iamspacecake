import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Button } from 'components/button'
import { addItemToShoppingCart } from './state/actions'
import { getShoppingCartItems } from './state/selectors'

class BuyButton extends Component {
  executeCartAction = (item, isItemAvailable) => {
    if (isItemAvailable) {
      this.props.addItemToShoppingCart(item)
    } else {
      this.props.history.push('/cart')
    }
  }

  isItemAvailable = (item) => {
    const { shoppingCartItems } = this.props
    let isItemAvailable = true
    Object.keys(shoppingCartItems).forEach((key) => {
      const shoppingCartItem = shoppingCartItems[key]
      if (shoppingCartItem.uuid === item.uuid) {
        isItemAvailable = shoppingCartItem.count < shoppingCartItem.stock
      }
    })
    return isItemAvailable
  }

  render() {
    const { item } = this.props
    const isItemAvailable = this.isItemAvailable(item)
    return (
      <Button
        className="sp-buy-button"
        onClick={() => this.executeCartAction(item, isItemAvailable)}
      >
        {isItemAvailable ? 'Buy Now' : 'View Cart'}
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
