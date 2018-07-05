import api from 'utils/api'

const ProductsService = {
  fetchProducts: (limit, page) => api.doFetch('/products?_format=json',
    {
      urlParams: { limit, page },
    })
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default ProductsService
