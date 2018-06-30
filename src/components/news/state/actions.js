import * as types from 'store/actionTypes'
import newsService from './service'

export function getRecentNews() {
  return dispatch => {
    newsService.fetchRecentNews()
      .then((response) => {
        dispatch(updateRecentNews(response));
      })
      .catch((error) => {
        console.log(error)
        const results = {
          error,
        }
        dispatch(updateRecentNews(results))
      })
  }
}

function updateRecentNews(recentNews) {
  return {
    type: types.NEWS_MOST_RECENT,
    recentNews,
  }
}
