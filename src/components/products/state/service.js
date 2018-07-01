import api from 'utils/api'

const ProductsService = {
  fetchProducts: (limit, page) => api.doFetch('/products',
    {
      urlParams: { limit, page },
    })
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default ProductsService
