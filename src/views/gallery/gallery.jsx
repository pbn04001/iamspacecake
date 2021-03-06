import React, { Component } from 'react'
import { CATEGORY } from 'service/product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Products from 'components/products/products'
import PageHeader from 'components/typography/pageHeader'
import { PRODUCTS_TYPE } from 'components/products/constants'
import { loadProducts } from './state/actions'

import './styles.scss'

class Gallery extends Component {
  static propTypes = {
    loadProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    category: PropTypes.string,
  }

  componentDidMount() {
    this.fetchProducts(this.props.category)
  }

  categoryChange = (e) => {
    this.fetchProducts(e.target.value)
  }

  fetchProducts = (category) => {
    this.props.loadProducts(category)
  }

  categorySelect = () => {
    return (
      <select
        className="sp-select"
        value={this.props.category}
        onChange={this.categoryChange}
      >
        <option value="">All</option>
        <option value={CATEGORY.PAINTING}>Painting</option>
        <option value={CATEGORY.JEWELRY}>Jewelry</option>
      </select>
    )
  }

  render() {
    const { category, products } = this.props
    return (
      <div className="sp-gallery sp-page">
        <div className="sp-gallery__header">
          <PageHeader>GALLERY</PageHeader>
          {this.categorySelect()}
        </div>
        <Products category={category} products={products} type={PRODUCTS_TYPE.GALLERY} />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    category: state.gallery.category,
    products: state.gallery.products,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { loadProducts },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
