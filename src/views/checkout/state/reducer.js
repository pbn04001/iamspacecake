import types from './actionTypes'

const initialState = {
  orderResults: null,
}

function checkout(state = initialState, action) {
  switch (action.type) {
    case types.purchaseComplete:
      return {
        ...state,
        orderResults: action.payload.results,
      }
    default:
      return state
  }
}

export default checkout
