import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { NavLink, withRouter } from 'react-router-dom'
import { addItemToShoppingCart } from 'views/cart/state/actions'
import { getSmallPicture, getMediumPicture } from 'utils/images'
import { PRODUCTS_TYPE } from './constants'

import 'styles/components/products/products.scss'

class Products extends Component {
  getPicture = (product, title) => {
    if (this.props.type && this.props.type === PRODUCTS_TYPE.GALLERY) {
      return getMediumPicture(product, title)
    }
    return getSmallPicture(product, title)
  }

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
          {this.getPicture(product, title)}
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
    if (!isEmpty(products)) {
      products.map(product => productsArray.push(this.renderNewProduct(product)))
    }
    return (<div className="sp-products__holder">{productsArray}</div>)
  }

  render() {
    return (
      <div className={
        classnames('sp-products', { [`sp-products--${this.props.type}`]: this.props.type })}
      >
        {this.renderNewProducts()}
      </div>
    )
  }
}

Products.propTypes = {
  products: PropTypes.array,
  addItemToShoppingCart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  type: PropTypes.string,
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { addItemToShoppingCart },
  dispatch,
)

export default connect(null, mapDispatchToProps)(withRouter(Products))
