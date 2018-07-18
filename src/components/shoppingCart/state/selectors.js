import { createSelector } from 'reselect'

export const getShoppingCart = state => state && state.shoppingCart

const shoppingCartItems = (shoppingCart) => {
  const shoppingCartArray = []
  Object.keys(shoppingCart.items).forEach((key) => {
    shoppingCartArray.push(shoppingCart.items[key])
  })
  return shoppingCartArray
}

const shoppingCartTotal = (shoppingCart) => {
  let total = 0
  Object.keys(shoppingCart.items).forEach((key) => {
    const item = shoppingCart.items[key]
    total += (item.price * item.quantity)
  })
  return total
}

export const getShoppingCartItems = createSelector(
  getShoppingCart,
  shoppingCart => shoppingCartItems(shoppingCart),
)

export const getShoppingCartTotal = createSelector(
  getShoppingCart,
  shoppingCart => shoppingCartTotal(shoppingCart),
)
