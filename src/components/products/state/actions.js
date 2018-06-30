import * as types from 'store/actionTypes'
import productsService from './service'

export function getNewestProducts() {
  return dispatch => {
    productsService.fetchProducts(5)
        .then((response) => {
          dispatch(updateNewestProducts(response));
        })
        .catch((error) => {
          console.log(error)
          const results = {
            error,
          }
          dispatch(updateNewestProducts(results))
        })
  }
}

function updateNewestProducts(newProducts) {
  return {
    type: types.NEWEST_PRODUCTS,
    newProducts,
  }
}
