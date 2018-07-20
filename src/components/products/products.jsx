import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { addItemToShoppingCart } from 'components/shoppingCart/state/actions'
import { getSmallPicture } from '../../utils/images'

import 'styles/components/products/products.scss'
import 'styles/components/modal.scss'

class Products extends Component {
  addToShoppingCart = (product) => {
    this.props.addItemToShoppingCart(product)
    this.props.history.push('/cart')
  }

  renderNewProduct = (product) => {
    const {
      title, uuid, nid, price,
    } = product
    return (
      <div className="sp-products__image" key={`sp-products-${uuid}`}>
        <NavLink to={`/product/${nid}`}>
          {getSmallPicture(product, title)}
        </NavLink>
        <span className="sp-products__title">{title}</span>
        <button
          type="button"
          onClick={() => this.addToShoppingCart(product)}
          className="sp-products__buy-now"
        >
          ${price} BUY NOW
        </button>
      </div>)
  }

  renderNewProducts = () => {
    const { products } = this.props
    const productsArray = []
    if (!_.isEmpty(products)) {
      products.map(product => productsArray.push(this.renderNewProduct(product)))
    }
    return (<div className="sp-products__holder">{productsArray}</div>)
  }

  render() {
    return (
      <div className="sp-products">
        {this.renderNewProducts()}
      </div>
    )
  }
}

Products.propTypes = {
  products: PropTypes.array,
  addItemToShoppingCart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { addItemToShoppingCart },
  dispatch,
)

export default connect(null, mapDispatchToProps)(withRouter(Products))
