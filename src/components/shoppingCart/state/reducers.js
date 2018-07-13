import * as types from 'store/actionTypes'

const initialState = {
  items: {},
}

const addItemToShoppingCart = (state, item) => {
  const shoppingCart = {
    items: state.items,
  }
  const existingItem = shoppingCart.items[item.uuid]
  if (existingItem) {
    if (item.stock > existingItem.quantity) {
      existingItem.quantity += 1
    }
  } else {
    shoppingCart.items[item.uuid] = {
      ...item,
      quantity: 1,
    }
  }
  return shoppingCart
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ITEM_TO_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: addItemToShoppingCart(state, action.payload.item),
      }
    default:
      return state
  }
}

export default news
