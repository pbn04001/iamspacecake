import types from './actionTypes'

const initialState = {
  orderProcessing: false,
  orderResults: null,
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.startPurchase:
      return {
        ...state,
        orderProcessing: true,
      }
    case types.purchaseComplete:
      return {
        ...state,
        orderProcessing: false,
        orderResults: action.payload.results,
      }
    default:
      return state
  }
}

export default news
