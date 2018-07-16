import { call, put, takeLatest } from 'redux-saga/effects'
import productsService from 'service/product'
import runSagas from 'store/sagas'
import types from './actionTypes'

export const loadProducts = (limit, category) => ({
  type: types.loadProducts,
  payload: {
    limit,
    category,
  },
})

function* loadProductsSaga(action) {
  const { limit, category } = action.payload
  const products = yield call(productsService.fetchProducts, limit, category)
  yield put({
    type: types.productsLoaded,
    payload: {
      products,
      category,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.loadProducts, loadProductsSaga)
}

runSagas(getWatchers)
