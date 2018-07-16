import types from './actionTypes'

const initialState = {
  products: [],
}

function products(state = initialState, action) {
  switch (action.type) {
    case types.newProductsLoaded:
      return {
        ...state,
        products: action.payload.products,
      }
    default:
      return state
  }
}

export default products
