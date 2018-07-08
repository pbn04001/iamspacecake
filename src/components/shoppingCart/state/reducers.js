import * as types from 'store/actionTypes'

const initialState = {
  items: {},
}

const addItemToShoppingCart = (state, item) => {
  const shoppingCart = {
    items: state.items,
  }
  const existingItem = shoppingCart.items[item.uuid[0].value]
  if (existingItem) {
    if (item.stock > existingItem.count) {
      existingItem.count += 1
    }
  } else {
    shoppingCart.items[item.uuid[0].value] = {
      ...item,
      count: 0,
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
