import api from 'utils/api'

const NewsService = {
  fetchRecentNews: preview => api.doFetch(`/api/news${preview ? '/unpublished' : ''}?_format=json`)
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default NewsService
