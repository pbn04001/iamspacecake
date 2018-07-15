import types from './actionTypes'

const initialState = {
  recentNews: [],
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.loginUpdate:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      }
    default:
      return state
  }
}

export default news
