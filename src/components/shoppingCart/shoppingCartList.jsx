import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { NavLink } from 'react-router-dom'
import { getThumbnail } from 'utils/images'
import { Card } from 'components/container'
import { getShoppingCartItems } from './state/selectors'
import { formatPrice } from '../../utils/price'

const ShoppingCartList = ({ shoppingCartItems }) => {
  const renderShoppingCartItems = () => shoppingCartItems.map((items) => {
    const { title, body, price, fieldImage, nid, uuid } = items
    return (
      <Card className="sp-shopping-cart__item" key={`sp-shopping-cart-list-item-${uuid}`}>
        <div className="sp-shopping-cart__image">
          <NavLink to={`/product/${nid}`}>
            {getThumbnail(fieldImage,
              title,
              'product_images')}
          </NavLink>
        </div>
        <div className="sp-shopping-cart__content">
          <span className="sp-shopping-cart__title">{title}</span>
          <div
            className="sp-shopping-cart__body"
            dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
          />
        </div>
        <span className="sp-shopping-cart__price">{formatPrice(price)}</span>
      </Card>)
  })

  const checkShoppingCartItems = () => {
    if (isEmpty(shoppingCartItems)) {
      return 'Shopping cart is empty'
    }
    return renderShoppingCartItems()
  }

  return (
    <div className="sp-shopping-cart">
      {checkShoppingCartItems()}
    </div>
  )
}

ShoppingCartList.propTypes = {
  shoppingCartItems: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    shoppingCartItems: getShoppingCartItems(state),
  }
}

export default connect(mapStateToProps, null)(ShoppingCartList)
