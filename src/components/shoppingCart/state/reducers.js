import * as types from 'store/actionTypes'

const initialState = {
  items: []
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ITEM_TO_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: state.items.push(action.payload.item),
      }
    default:
      return state
  }
}

export default news
