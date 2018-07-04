import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Button } from 'components/button'
import { addItemToShoppingCart } from './state/actions'

class BuyButton extends Component {
  addItemToShoppingCart = item => this.props.addItemToShoppingCart(item)

  render() {
    const { item } = this.props
    return (
      <Button
        className="sp-buy-button"
        onClick={() => this.addItemToShoppingCart(item)}
      >
        Buy Now
      </Button>)
  }
}


BuyButton.propTypes = {
  addItemToShoppingCart: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { addItemToShoppingCart },
  dispatch,
)

export default connect(null, mapDispatchToProps)(BuyButton)
