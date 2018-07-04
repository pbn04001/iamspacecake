import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container } from 'components/container'
import { getShoppingCartItems } from './state/selectors'

const ShoppingCartList = ({ shoppingCartItems }) => {
  const getShoppingCartItem = item => (
    <div>{item.title[0].value} count({item.count})</div>
  )

  return shoppingCartItems.map((item) => {
    return (
      <Container key={`sp-shopping-cart-list-${item.uuid[0].value}`}>
        {getShoppingCartItem(item)}
      </Container>)
  })
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
