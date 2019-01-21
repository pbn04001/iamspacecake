import React, { Component } from 'react'
import { CATEGORY } from 'service/product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Products from 'components/products/products'
import PageHeader from 'components/typography/pageHeader'
import { loadProducts } from './state/actions'

import './styles.scss'

class Shop extends Component {
  static propTypes = {
    loadProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    category: PropTypes.string,
    match: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    loadingProducts: PropTypes.bool.isRequired,
    endOfProducts: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const {
      match, page, category, loadingProducts,
    } = this.props
    if (!loadingProducts) {
      const curCategory = match.params.category ? match.params.category : category
      this.fetchProducts(curCategory, page)
    }
    this.onScrollEvent = this.onScroll.bind(this)
    window.addEventListener('scroll', this.onScrollEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollEvent)
  }

  onScroll = () => {
    const scrollMarker = document.getElementById('sp-shop-bottom-marker')
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollMarker.offsetTop < window.innerHeight + scrollTop) {
      this.fetchMoreProducts()
    }
  }

  categoryChange = (e) => {
    this.fetchProducts(e.target.value, 0)
  }

  fetchProducts = (category, page, append = false) => {
    this.props.loadProducts(category, page, append)
  }

  fetchMoreProducts = () => {
    if (!this.props.loadingProducts && !this.props.endOfProducts) {
      const { category, page } = this.props
      this.fetchProducts(category, page + 1, true)
    }
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
        <option value={CATEGORY.GLASS}>Glass</option>
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
        <div id="sp-shop-bottom-marker" />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    category: state.shop.category,
    products: state.shop.products,
    page: state.shop.page,
    loadingProducts: state.shop.loadingProducts,
    endOfProducts: state.shop.endOfProducts,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { loadProducts },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
