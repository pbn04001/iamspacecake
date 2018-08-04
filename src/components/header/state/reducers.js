import types from './actionTypes'

const initialState = {
  isSearchOpen: false,
}

function products(state = initialState, action) {
  switch (action.type) {
    case types.startSearch:
      return {
        ...state,
        isSearchOpen: true,
      }
    case types.closeSearch:
      return {
        ...state,
        isSearchOpen: false,
      }
    default:
      return state
  }
}

export default products
