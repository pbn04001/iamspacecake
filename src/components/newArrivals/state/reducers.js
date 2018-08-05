import types from './actionTypes'

const initialState = {
  newArrivals: [],
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.updateNewArrivals:
      return {
        ...state,
        newArrivals: action.payload.newArrivals,
      }
    default:
      return state
  }
}

export default news
