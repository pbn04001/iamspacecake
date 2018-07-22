import { createSelector } from 'reselect'

export const getShoppingCart = state => state && state.cart

export const shoppingCartItems = (items) => {
  const shoppingCartArray = []
  Object.keys(items).forEach((key) => {
    shoppingCartArray.push(items[key])
  })
  return shoppingCartArray
}

export const shoppingCartTotal = (items) => {
  let total = 0
  Object.keys(items).forEach((key) => {
    const item = items[key]
    total += (item.price * item.quantity)
  })
  return total
}

export const getShoppingCartItems = createSelector(
  getShoppingCart,
  cart => shoppingCartItems(cart.items),
)

export const getShoppingCartTotal = createSelector(
  getShoppingCart,
  cart => shoppingCartTotal(cart.items),
)

export const getErrorModal = createSelector(
  getShoppingCart,
  cart => cart.errorModal,
)

export const getOrderResults = createSelector(
  getShoppingCart,
  cart => cart.orderResults,
)

export const getOrderItems = createSelector(
  getShoppingCart,
  cart => cart.orderItems,
)

export const getOrderTotal = createSelector(
  getShoppingCart,
  cart => cart.orderTotal,
)
