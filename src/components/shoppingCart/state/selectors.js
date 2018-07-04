import { createSelector } from 'reselect'

export const getShoppingCart = state => state && state.shoppingCart

const shoppingCartItems = (shoppingCart) => {
  const shoppingCartArray = []
  Object.keys(shoppingCart.items).forEach((key) => {
    shoppingCartArray.push(shoppingCart.items[key])
  })
  return shoppingCartArray
}

export const getShoppingCartItems = createSelector(
  getShoppingCart,
  shoppingCart => shoppingCartItems(shoppingCart),
)
