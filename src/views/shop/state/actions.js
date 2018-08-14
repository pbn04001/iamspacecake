import { call, put, takeLatest } from 'redux-saga/effects'
import productsService from 'service/product'
import runSagas from 'store/sagas'
import types from './actionTypes'

const PRODUCTS_PER_PAGE = 20

export const loadProducts = (category, page, append) => ({
  type: types.loadProducts,
  payload: {
    category,
    page,
    append,
  },
})

function* loadProductsSaga(action) {
  const { category, page } = action.payload
  const products = yield call(productsService.fetchProducts, category, page)
  const endOfProducts = products.length < PRODUCTS_PER_PAGE
  yield put({
    type: types.productsLoaded,
    payload: {
      products,
      category,
      page,
      append: action.payload.append,
      endOfProducts,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.loadProducts, loadProductsSaga)
}

runSagas(getWatchers)
