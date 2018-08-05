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

export const getShoppingCartItems = state => shoppingCartItems(state.cart.items)

export const getShoppingCartTotal = state => shoppingCartTotal(state.cart.items)

export const getErrorModal = state => state.cart.errorModal

export const getOrderResults = state => state.cart.orderResults
