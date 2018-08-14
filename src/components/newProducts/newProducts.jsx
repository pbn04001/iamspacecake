import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { NavLink, withRouter } from 'react-router-dom'
import { Container } from 'components/container'
import { addItemToShoppingCart } from 'views/cart/state/actions'
import { getNewProductsPicture } from 'utils/images'
import { Button } from 'components/button'
import { loadNewProducts } from './state/actions'

import './newProductsStyles.scss'

class NewProducts extends Component {
  componentDidMount() {
    this.props.loadNewProducts(this.props.category)
  }

  addToShoppingCart = (product) => {
    this.props.addItemToShoppingCart(product)
    this.props.history.push('/cart')
  }

  renderNewProduct = (product) => {
    const {
      title, nid, price,
    } = product
    const key = this.props.category ? `sp-new-${this.props.category}-${nid}` : `sp-new-products-${nid}`
    return (
      <div className="sp-new-products__image" key={key}>
        <NavLink to={`/product/${nid}`}>
          {getNewProductsPicture(product, title)}
        </NavLink>
        <span className="sp-new-products__title">{title}</span>
        <button
          type="button"
          onClick={() => this.addToShoppingCart(product)}
          className="sp-new-products__buy-now"
        >
          ${price} BUY NOW
        </button>
      </div>)
  }

  renderNewProducts = (products) => {
    const someProducts = products.length > 4 ? products.slice(0, 4) : products
    const productsArray = []
    if (!isEmpty(someProducts)) {
      someProducts.forEach(product => productsArray.push(this.renderNewProduct(product)))
    }
    return (<div className="sp-new-products__holder">{productsArray}</div>)
  }

  render() {
    let { products } = this.props
    const { category, title } = this.props
    if (category) {
      products = this.props.productsCategory[category]
    }
    if (products && products.length > 0) {
      const link = category ? `/shop/${category}` : '/shop'
      return (
        <Container className={classnames('sp-new-products', this.props.className)}>
          <h3>{this.props.title ? this.props.title : 'NEW ARRIVALS'}</h3>
          {this.renderNewProducts(products)}
          <NavLink to={link}>
            <Button>SEE MORE {title}</Button>
          </NavLink>
        </Container>
      )
    }
    return null
  }
}

NewProducts.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
  productsCategory: PropTypes.object,
  loadNewProducts: PropTypes.func.isRequired,
  addItemToShoppingCart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  category: PropTypes.string,
  title: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    productsCategory: state.newProducts.productsCategory,
    products: state.newProducts.products,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { loadNewProducts, addItemToShoppingCart },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProducts))
