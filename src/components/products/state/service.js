import fetch from 'isomorphic-fetch'
import { rest } from 'utils/server'

const ProductsService = {
  fetchProducts: (limit, page) => fetch(`${rest}/api/products`,
      {
        urlParams: { limit, page }
      })
      .then(response => response.json())
      .catch(error => {
        const response = {
          error: error.message
        };
        return response;
      })
};

export default ProductsService;
