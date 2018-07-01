import * as types from 'store/actionTypes'
import productsService from './service'

function updateNewestProducts(newProducts) {
  return {
    type: types.NEWEST_PRODUCTS,
    newProducts,
  }
}

export function getNewestProducts() {
  return (dispatch) => {
    productsService.fetchProducts(5)
      .then((response) => {
        dispatch(updateNewestProducts(response))
      })
      .catch((error) => {
        const results = {
          error,
        }
        dispatch(updateNewestProducts(results))
      })
  }
}

export default getNewestProducts
