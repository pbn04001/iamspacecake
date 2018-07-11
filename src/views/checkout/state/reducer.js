import types from './actionTypes'

const initialState = {
  orderProcessing: false,
  orderResults: null,
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.completePurchase:
      return {
        ...state,
        orderProcessing: true,
        orderResults: null,
      }
    case types.purchaseCompleted:
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
