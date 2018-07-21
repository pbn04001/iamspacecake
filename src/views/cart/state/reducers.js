import types from './actionTypes'

const initialState = {
  items: {},
  errorModal: {
    visible: false,
  },
}

const addItemToShoppingCart = (state, item) => {
  const shoppingCartItems = {
    items: state.items,
  }
  const existingItem = shoppingCartItems.items[item.uuid]
  if (existingItem) {
    if (item.stock > existingItem.quantity) {
      existingItem.quantity += 1
    }
  } else {
    shoppingCartItems.items[item.uuid] = {
      ...item,
      quantity: 1,
    }
  }
  return shoppingCartItems.items
}

const removeItemFromShoppingCart = (state, item) => {
  const shoppingCartItems = {}
  Object.keys(state.items).forEach((key) => {
    const existingItem = state.items[key]
    if (key !== item.uuid) {
      shoppingCartItems[key] = existingItem
    }
  })
  return shoppingCartItems
}

function shoppingCart(state = initialState, action) {
  switch (action.type) {
    case types.addItemToShoppingCart:
      return {
        ...state,
        items: addItemToShoppingCart(state, action.payload.item),
      }
    case types.removeItemFromShoppingCart:
      return {
        ...state,
        items: removeItemFromShoppingCart(state, action.payload.item),
      }
    case types.emptyShoppingCart:
      return {
        ...state,
        items: {},
      }
    case types.toggleErrorModal:
      return {
        ...state,
        errorModal: {
          ...action.payload,
        },
      }
    case types.purchaseComplete:
      return {
        ...state,
        orderResults: action.payload.results,
      }
    default:
      return state
  }
}

export default shoppingCart
