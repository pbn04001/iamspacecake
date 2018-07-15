import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { Container } from 'components/container'
import * as actionCreators from './state/actions'
import { getPicture } from '../../utils/images'

class NewProducts extends Component {
  componentWillMount() {
    this.props.getNewestProducts()
  }

  renderNewProduct = (product) => {
    const {
      title, fieldImage, uuid, nid,
    } = product
    return (
      <div className="sp-new-products__image" key={`sp-new-products-${uuid}`}>
        <NavLink to={`/product/${nid}`}>
          {getPicture(fieldImage,
            title,
            { small: true, mobile: true },
            'product_images')}
          <span className="sp-new-products__title">{title}</span>
        </NavLink>
      </div>)
  }

  renderNewProducts = () => {
    const { newProducts } = this.props
    const products = []
    if (!_.isEmpty(newProducts)) {
      newProducts.map(product => products.push(this.renderNewProduct(product)))
    }
    return (<div className="sp-new-products__holder">{products}</div>)
  }

  render() {
    return (
      <Container className={classnames('sp-new-products', this.props.className)}>
        <h3>New arrivals</h3>
        {this.renderNewProducts()}
      </Container>
    )
  }
}

NewProducts.propTypes = {
  className: PropTypes.string,
  newProducts: PropTypes.array.isRequired,
  getNewestProducts: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    newProducts: state.products.newProducts,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProducts)
