import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { Container, CONTAINER_TYPE } from 'components/container'
import { addItemToShoppingCart } from 'components/shoppingCart/state/actions'
import { loadNewProducts } from './state/actions'
import { getPicture } from '../../utils/images'

class Products extends Component {
  componentWillMount() {
    this.props.loadNewProducts()
  }

  addToShoppingCart = (product) => {
    this.props.addItemToShoppingCart(product)
    this.props.history.push('/cart')
  }

  renderNewProduct = (product) => {
    const {
      title, fieldImage, uuid, nid, price,
    } = product
    return (
      <div className="sp-products__image" key={`sp-products-${uuid}`}>
        <NavLink to={`/product/${nid}`}>
          {getPicture(fieldImage,
            title,
            { small: true, mobile: true },
            'product_images')}
        </NavLink>
        <span className="sp-products__title">{title}</span>
        <button
          type="button"
          onClick={() => this.addToShoppingCart(product)}
          className="sp-products__buy-now"
        >
          ${price} Buy Now
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
      <Container
        type={CONTAINER_TYPE.TOP_LEFT}
        className={classnames('sp-products', this.props.className)}
      >
        <h3>New arrivals</h3>
        {this.renderNewProducts()}
      </Container>
    )
  }
}

Products.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
  loadNewProducts: PropTypes.func.isRequired,
  addItemToShoppingCart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { loadNewProducts, addItemToShoppingCart },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products))
