import * as types from '../../redux/actionTypes'
import NewsService from './utils/newsService'

export function getRecentNews() {
  return dispatch => {
    NewsService.fetchRecentNews()
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
