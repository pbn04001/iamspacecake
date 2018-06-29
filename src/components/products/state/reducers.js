import * as types from '../../../redux/actionTypes'

const initialState = {
  newProducts: []
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.NEWEST_PRODUCTS:
      return {
        ...state,
        newProducts: action.newProducts
      }
    default:
      return state
  }
}

export default news
