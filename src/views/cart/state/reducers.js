import types from './actionTypes'
import { shoppingCartTotal, shoppingCartItems } from './selectors'

const initialState = {
  items: {},
  orderResults: null,
  errorModal: {
    visible: false,
  },
  lastUpdated: null,
}

const addItemToShoppingCart = (items, item) => {
  const cartItems = {
    ...items,
  }
  const existingItem = cartItems[item.uuid]
  if (existingItem) {
    if (item.stock > existingItem.quantity) {
      existingItem.quantity += 1
    }
  } else {
    cartItems[item.uuid] = {
      ...item,
      quantity: 1,
    }
  }
  return cartItems
}

const removeItemFromShoppingCart = (items, item) => {
  const cartItems = {}
  Object.keys(items)
    .forEach((key) => {
      const existingItem = items[key]
      if (key !== item.uuid) {
        cartItems[key] = existingItem
      }
    })
  return cartItems
}

function cart(state = initialState, action) {
  switch (action.type) {
    case types.viewDidMount:
      return {
        ...state,
        errorModal: { visible: false },
      }
    case types.addItemToShoppingCart:
      return {
        ...state,
        items: addItemToShoppingCart(state.items, action.payload.item),
        lastUpdated: (new Date()).toString(),
      }
    case types.removeItemFromShoppingCart:
      return {
        ...state,
        items: removeItemFromShoppingCart(state.items, action.payload.item),
        lastUpdated: (new Date()).toString(),
      }
    case types.emptyShoppingCart:
      return {
        ...state,
        items: {},
        lastUpdated: null,
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
        orderResults: {
          results: action.payload.results,
          items: shoppingCartItems(state.items),
          total: shoppingCartTotal(state.items),
        },
        items: {},
        lastUpdated: null,
      }
    default:
      return state
  }
}

export default cart
