import * as types from '../../../redux/actionTypes'

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
