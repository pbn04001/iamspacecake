import api from 'utils/api'

const NewsService = {
  fetchRecentNews: () => api.doFetch('/news?_format=json')
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default NewsService
