import api from 'utils/api'
import Logger from 'utils/logger'

export const ERROR_TYPE = {
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
}

export const CATEGORY = {
  PAINTING: 'Painting',
  JEWELRY: 'Jewelry',
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
  fetchNewProducts: (limit, category) => {
    const url = category
      ? `/api/products/category/new/${category}?_format=json`
      : '/api/products/new?_format=json'
    return api.doFetch(url,
      { urlParams: { limit } })
      .then(response => parseProducts(response))
      .catch(error => ({ error: error.message }))
  },
  fetchProducts: (limit, category) => {
    const url = category
      ? `/api/products/category/${category}?_format=json`
      : '/api/products?_format=json'
    return api.doFetch(url,
      { urlParams: { limit } })
      .then(response => parseProducts(response))
      .catch(error => ({ error: error.message }))
  },
  fetchProduct: productId => api.doFetch(`/api/product/${productId}?_format=json`)
    .then((response) => {
      if (response.length > 0) {
        return parseProducts(response)[0]
      }
      return { error: 'Product not found', type: ERROR_TYPE.PRODUCT_NOT_FOUND }
    })
    .catch(error => ({ error: error.message })),
}

export default ProductsService
