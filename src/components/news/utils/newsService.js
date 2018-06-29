import fetch from 'isomorphic-fetch'
import { rest } from 'utils/server'

const NewsService = {
  fetchRecentNews: () => fetch(`${rest}/api/news`)
    .then(response => response.json())
    .catch(error => {
      const response = {
        error: error.message
      };
      return response;
    })
};

export default NewsService;
