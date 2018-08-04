import types from './actionTypes'

const initialState = {
  category: '',
  products: [],
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.loadProducts:
      return {
        ...state,
        category: action.payload.category,
      }
    case types.productsLoaded:
      return {
        ...state,
        products: action.payload.products,
      }
    default:
      return state
  }
}

export default news
