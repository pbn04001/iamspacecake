import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import BuyButton from 'components/shoppingCart/buyButton'
import { Container } from 'components/container'
import * as actionCreators from './state/actions'
import { getPicture } from '../../utils/images'

class NewProducts extends Component {
  componentWillMount() {
    this.props.getNewestProducts()
  }

  renderNewProduct = (product) => {
    const title = _.first(product.title).value
    const rightContent = (!isEmpty(product.fieldImage))
      ? (
        <div className="sp-right-content">
          {getPicture(product.fieldImage[0].url,
            title,
            { large: true, medium: true, small: true },
            'news_images')}
        </div>) : null
    return (
      <article>
        <div className="sp-left-content">
          <h2>{title}</h2>
          {rightContent}
          <div
            className="sp-article-body"
            dangerouslySetInnerHTML={{ __html: _.first(product.body).value }} // eslint-disable-line react/no-danger
          />
        </div>
        {rightContent}
        <BuyButton item={product} />
      </article>)
  }

  renderNewProducts = () => {
    const { newProducts } = this.props
    const products = []
    if (!_.isEmpty(newProducts)) {
      newProducts.map(product => products.push(this.renderNewProduct(product)))
    }
    return products
  }

  render() {
    return (
      <Container className="sp-news">
        {this.renderNewProducts()}
      </Container>
    )
  }
}

NewProducts.propTypes = {
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
