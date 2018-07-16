import React, { Component } from 'react'
import { CATEGORY } from 'service/product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Products from 'components/products/products'
import { Container, CONTAINER_TYPE } from 'components/container'
import PageHeader from 'components/typography/pageHeader'
import { loadProducts } from './state/actions'

class Shop extends Component {
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
    this.props.loadProducts(50, category)
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
        <Container
          type={CONTAINER_TYPE.TOP_LEFT}
          className="sp-products"
        >
          <div className="sp-shop__header">
            <PageHeader>New arrivals</PageHeader>
            {this.categorySelect()}
          </div>
          <Products category={category} products={products} />
        </Container>
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
