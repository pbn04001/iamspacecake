import types from './actionTypes'

const initialState = {
  product: null,
  modalOpen: false,
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.loadProduct:
      return {
        ...state,
        product: null,
        modalOpen: false,
      }
    case types.productLoaded:
      return {
        ...state,
        product: action.payload.product,
      }
    case types.toggleModal:
      return {
        ...state,
        modalOpen: action.payload.open,
      }
    default:
      return state
  }
}

export default news
