import fetch from 'isomorphic-fetch'

const NewsService = {
  fetchRecentNews: () => fetch('/rest/api/events')
    .then(response => response.json())
    .catch(error => {
      const response = {
        error: error.message
      };
      return response;
    })
};

export default NewsService;
