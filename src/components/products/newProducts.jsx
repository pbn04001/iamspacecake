import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import BuyButton from 'components/shoppingCart/buyButton'
import * as actionCreators from './state/actions'
import { getPicture } from '../../utils/images'

class NewProducts extends Component {
  componentWillMount() {
    this.props.getNewestProducts()
  }

  renderNewProducts = () => {
    if (!_.isEmpty(this.props.newProducts)) {
      const newProducts = this.props.newProducts[0]
      const title = _.first(newProducts.title).value
      const rightContent = (!isEmpty(newProducts.fieldImage))
        ? (
          <div className="sp-right-content">
            {getPicture(newProducts.fieldImage[0].url,
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
              dangerouslySetInnerHTML={{ __html: _.first(newProducts.body).value }} // eslint-disable-line react/no-danger
            />
          </div>
          {rightContent}
          <BuyButton />
        </article>)
    }
    return null
  }

  render() {
    return (
      <section className="sp-news">
        {this.renderNewProducts()}
      </section>
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
