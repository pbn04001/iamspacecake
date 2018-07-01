import types from './actionTypes'

const initialState = {
  recentNews: [],
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.updateRecentNews:
      return {
        ...state,
        recentNews: action.payload.recentNews,
      }
    default:
      return state
  }
}

export default news
