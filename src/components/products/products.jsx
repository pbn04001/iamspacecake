import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Container, CONTAINER_TYPE } from 'components/container'
import * as actionCreators from './state/actions'
import { getPicture } from '../../utils/images'

class Products extends Component {
  componentWillMount() {
    this.props.getNewestProducts()
  }

  renderNewProduct = (product) => {
    const {
      title, fieldImage, uuid,
    } = product
    return (
      <div className="sp-products__image" key={`sp-products-${uuid}`}>
        {getPicture(fieldImage,
          title,
          { small: true, mobile: true },
          'product_images')}
        <span className="sp-products__title">{title}</span>
      </div>)
  }

  renderNewProducts = () => {
    const { newProducts } = this.props
    const products = []
    if (!_.isEmpty(newProducts)) {
      newProducts.map(product => products.push(this.renderNewProduct(product)))
    }
    return (<div className="sp-products__holder">{products}</div>)
  }

  render() {
    return (
      <Container type={CONTAINER_TYPE.TOP_LEFT} className={classnames('sp-products', this.props.className)}>
        <h3>For sale</h3>
        {this.renderNewProducts()}
      </Container>
    )
  }
}

Products.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Products)
