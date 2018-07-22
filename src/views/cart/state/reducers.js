import types from './actionTypes'
import { shoppingCartTotal, shoppingCartItems } from './selectors'

const initialState = {
  items: {},
  orderResults: null,
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
  Object.keys(state.items)
    .forEach((key) => {
      const existingItem = state.items[key]
      if (key !== item.uuid) {
        shoppingCartItems[key] = existingItem
      }
    })
  return shoppingCartItems
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
        orderItems: shoppingCartItems(state.items),
        orderTotal: shoppingCartTotal(state.items),
        orderResults: action.payload.results,
        items: {},
      }
    default:
      return state
  }
}

export default cart
