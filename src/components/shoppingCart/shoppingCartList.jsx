import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Card, TYPE } from 'components/container'
import { PageHeader } from 'components/typography'
import { getShoppingCartItems } from './state/selectors'

const ShoppingCartList = ({ shoppingCartItems }) => {
  const getShoppingCartItem = item => (
    <div className="sp-shopping-cart-item" key={`sp-shopping-cart-list-item-${item.uuid[0].value}`}>
      {item.title[0].value} count({item.count})
    </div>
  )

  return (
    <Container type={TYPE.MAIN}>
      <PageHeader>Shopping Cart</PageHeader>
      <Card>
        {shoppingCartItems.map(item => getShoppingCartItem(item))}
      </Card>
    </Container>)
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
