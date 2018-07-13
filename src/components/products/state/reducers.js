import * as types from 'store/actionTypes'

const initialState = {
  newProducts: [],
}

function products(state = initialState, action) {
  switch (action.type) {
    case types.NEWEST_PRODUCTS:
      return {
        ...state,
        newProducts: action.newProducts,
      }
    default:
      return state
  }
}

export default products
