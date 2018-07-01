import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { addItemToShoppingCart } from './state/actions'

class BuyButton extends Component {
  addItemToShoppingCart = () => this.props.addItemToShoppingCart

  render() {
    return (
      <button
        type="button"
        className="sp-buy-button"
        onClick={this.addItemToShoppingCart}
      >
        Buy Now
      </button>)
  }
}


BuyButton.propTypes = {
  addItemToShoppingCart: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { addItemToShoppingCart },
  dispatch,
)

export default connect(null, mapDispatchToProps)(BuyButton)
