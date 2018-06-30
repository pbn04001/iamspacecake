import * as types from 'store/actionTypes'

const initialState = {
  recentNews: []
}

function news(state = initialState, action) {
  switch (action.type) {
    case types.NEWS_MOST_RECENT:
      return {
        ...state,
        recentNews: action.recentNews
      }
    default:
      return state
  }
}

export default news
