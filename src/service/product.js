import api from 'utils/api'
import Logger from 'utils/logger'

export const ERROR_TYPE = {
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
}

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
    { urlParams: { limit, page } })
    .then(response => parseProducts(response))
    .catch(error => ({ error: error.message })),
  fetchProduct: productId => api.doFetch(`/api/products/${productId}?_format=json`)
    .then((response) => {
      if (response.length > 0) {
        return parseProducts(response)[0]
      }
      return { error: 'Product not found', type: ERROR_TYPE.PRODUCT_NOT_FOUND }
    })
    .catch(error => ({ error: error.message })),
}

export default ProductsService
