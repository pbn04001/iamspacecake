import types from './actionTypes'

const initialState = {
  isMenuActive: false,
}

function app(state = initialState, action) {
  switch (action.type) {
    case types.setMenuActive:
      return {
        ...state,
        isMenuActive: action.payload.isMenuActive,
      }
    default:
      return state
  }
}

export default app
