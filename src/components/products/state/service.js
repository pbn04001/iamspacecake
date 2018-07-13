import api from 'utils/api'
import Logger from 'utils/logger'

const parseProducts = (products) => {
  return products.map((product) => {
    try {
      return {
        ...product,
        price: parseFloat(product.fieldPrice),
        stock: parseInt(product.fieldStock, 10),
      }
    } catch (error) {
      Logger.logError({
        ...error,
        message: `Unable to parse price or stock for product ${product.nid}`,
      })
      return null
    }
  })
}

const ProductsService = {
  fetchProducts: (limit, page) => api.doFetch('/api/products?_format=json',
    {
      urlParams: { limit, page },
    })
    .then(response => parseProducts(response))
    .catch(error => ({ error: error.message })),
}

export default ProductsService
