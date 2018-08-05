import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { NavLink, withRouter } from 'react-router-dom'
import { Container } from 'components/container'
import { addItemToShoppingCart } from 'views/cart/state/actions'
import { getSmallPicture } from 'utils/images'
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
          {getSmallPicture(product, title)}
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

  renderNewProducts = () => {
    let { products, category } = this.props
    if (category) {
      products = this.props.productsCategory[category]
    }
    const productsArray = []
    if (!isEmpty(products)) {
      if (products.length > 4) {
        products = products.slice(0, 4)
      }
      products.forEach(product => productsArray.push(this.renderNewProduct(product)))
    }
    return (<div className="sp-new-products__holder">{productsArray}</div>)
  }

  render() {
    return (
      <Container className={classnames('sp-new-products', this.props.className)}>
        <h3>{ this.props.category ? this.props.category.toUpperCase() : 'NEW ARRIVALS'}</h3>
        {this.renderNewProducts()}
        { /* <NavLink to="/shop">
          <Button>SEE MORE</Button>
        </NavLink> */ }
      </Container>
    )
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
}

function mapStateToProps(state) {
  return {
    productsCategory: state.products.productsCategory,
    products: state.products.products,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { loadNewProducts, addItemToShoppingCart },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProducts))
