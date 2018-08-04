import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { addItemToShoppingCart } from 'views/cart/state/actions'
import { Container, CONTAINER_TYPE } from 'components/container'
import { Button } from 'components/button'
import { PageHeader } from 'components/typography'
import { formatPrice } from 'utils/price'
import { getRecentNews } from './state/actions'
import { getSmallPicture } from '../../utils/images'

import 'styles/components/news.scss'

class News extends React.Component {
  componentWillMount() {
    this.props.getRecentNews()
  }

  addToShoppingCart = (product) => {
    this.props.addItemToShoppingCart(product)
    this.props.history.push('/cart')
  }

  renderNews = () => {
    if (!isEmpty(this.props.recentNews) && !this.props.recentNews.error) {
      const mainNews = this.props.recentNews[0]
      const {
        title, defaultImage, body, price,
      } = mainNews
      const rightContent = (!isEmpty(defaultImage))
        ? (
          <div className="sp-news__image">
            {getSmallPicture(mainNews, title)}
          </div>) : null
      return (
        <Fragment>
          <article>
            <PageHeader>NEW: {title}</PageHeader>
            <span className="sp-news__spacer" />
            <span className="sp-news__spacer_2" />
            {rightContent}
            <div
              className="sp-article-body"
              dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
            />
            <div className="sp-news__price-buy">
              <span className="sp-news__price">{formatPrice(price)}</span>
              <Button
                onClick={() => this.addToShoppingCart(mainNews)}
              >
                BUY NOW
              </Button>
            </div>
          </article>
        </Fragment>)
    }
    return <article />
  }

  render() {
    return (
      <Container type={CONTAINER_TYPE.TOP_LEFT} className={classnames('sp-news', this.props.className)}>
        {this.renderNews()}
      </Container>
    )
  }
}

News.propTypes = {
  className: PropTypes.string,
  recentNews: PropTypes.array.isRequired,
  getRecentNews: PropTypes.func.isRequired,
  history: PropTypes.object,
  addItemToShoppingCart: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    recentNews: state.news.recentNews,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { getRecentNews, addItemToShoppingCart },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(News))
