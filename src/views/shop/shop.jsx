import React, { Component } from 'react'
import { CATEGORY } from 'service/product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Products from 'components/products/products'
import PageHeader from 'components/typography/pageHeader'
import { loadProducts } from './state/actions'

import 'styles/views/shop.scss'

class Shop extends Component {
  static propTypes = {
    loadProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    category: PropTypes.string,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match } = this.props
    const category = match.params.category ? match.params.category : this.props.category
    this.fetchProducts(category)
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
      <div className="sp-shop sp-page">
        <div className="sp-shop__header">
          <PageHeader>NEW ARRIVALS</PageHeader>
          {this.categorySelect()}
        </div>
        <Products category={category} products={products} />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    category: state.shop.category,
    products: state.shop.products,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { loadProducts },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
