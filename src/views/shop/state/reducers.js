import types from './actionTypes'

const initialState = {
  page: 0,
  category: '',
  products: [],
  loadingProducts: false,
  endOfProducts: false,
}

function getProducts(state, action) {
  return action.payload.append
    ? state.products.concat(action.payload.products)
    : action.payload.products
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.loadProducts:
      return {
        ...state,
        category: action.payload.category,
        loadingProducts: true,
      }
    case types.productsLoaded:
      return {
        ...state,
        products: getProducts(state, action),
        page: action.payload.page,
        loadingProducts: false,
        endOfProducts: action.payload.endOfProducts
      }
    default:
      return state
  }
}

export default news
