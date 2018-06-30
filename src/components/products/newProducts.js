import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './state/actions'
import PropTypes from 'prop-types'
import BuyButton from 'components/shoppingCart/buyButton';
import { isEmpty } from 'lodash'
import { getPicture } from '../../utils/images';

class NewProducts extends Component {

  componentWillMount() {
    this.props.getNewestProducts();
  }

  renderNewProducts() {
    if (!_.isEmpty(this.props.newProducts)) {
      let newProducts = this.props.newProducts[0]
      const title = _.first(newProducts.title).value
      const rightContent = (!isEmpty(newProducts.field_image)) ?
          (<div className='sp-right-content'>
            {getPicture(newProducts.field_image[0].url,
                title,
                { large: true, medium: true, small: true },
                'news_images')}
          </div>) : null;
      return (<article>
        <div className='sp-left-content'>
          <h2>{title}</h2>
          {rightContent}
          <div
              className='sp-article-body'
              dangerouslySetInnerHTML={{ __html: _.first(newProducts.body).value }}>
          </div>
        </div>
        {rightContent}
        <BuyButton />
      </article>)
    }
  }

  render() {
    return (
        <section className='sp-news'>
          {this.renderNewProducts()}
        </section>
    )
  }
}

NewProducts.propTypes = {
  newProducts: PropTypes.array,
  getNewestProducts: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    newProducts: state.products.newProducts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProducts)