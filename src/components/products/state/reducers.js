import types from './actionTypes'

const initialState = {
  products: [],
  category: null,
  productsCategory: {},
}

function products(state = initialState, action) {
  switch (action.type) {
    case types.newProductsLoaded:
      if (action.payload.category) {
        return {
          ...state,
          category: action.payload.category,
          productsCategory: {
            ...state.productsCategory,
            [action.payload.category]: action.payload.products,
          },
        }
      }
      return {
        ...state,
        products: action.payload.products,
      }
    default:
      return state
  }
}

export default products
