import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { addItemToShoppingCart } from 'views/cart/state/actions'
import { Container, CONTAINER_TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { getNewArrivals } from './state/actions'
import { getSmallPicture } from '../../utils/images'

import './styles.scss'

class NewArrivals extends React.Component {
  componentWillMount() {
    this.props.getNewArrivals()
  }

  addToShoppingCart = (product) => {
    this.props.addItemToShoppingCart(product)
    this.props.history.push('/cart')
  }

  renderNewArrivals = () => {
    const { newArrivals } = this.props
    return newArrivals.map((product) => {
      const {
        title, price, nid,
      } = product
      return (
        <article key={`new-arrivals-${nid}`} className="sp-new-arrivals__image">
          <NavLink to={`/product/${nid}`}>
            {getSmallPicture(product, title)}
          </NavLink>
          <span className="sp-new-arrivals__title">{title}</span>
          <button
            type="button"
            onClick={() => this.addToShoppingCart(product)}
            className="sp-new-arrivals__buy-now"
          >
            ${price} BUY NOW
          </button>
        </article>)
    })
  }

  render() {
    const { newArrivals } = this.props
    if (newArrivals && newArrivals.length > 0) {
      return (
        <Container type={CONTAINER_TYPE.TOP_LEFT} className={classnames('sp-new-arrivals', this.props.className)}>
          <PageHeader>
            NEW ARRIVALS
          </PageHeader>
          {this.renderNewArrivals()}
        </Container>
      )
    }
    return null
  }
}

NewArrivals.propTypes = {
  className: PropTypes.string,
  newArrivals: PropTypes.array.isRequired,
  getNewArrivals: PropTypes.func.isRequired,
  history: PropTypes.object,
  addItemToShoppingCart: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    newArrivals: state.newArrivals.newArrivals,
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators(
  { getNewArrivals, addItemToShoppingCart },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewArrivals))
