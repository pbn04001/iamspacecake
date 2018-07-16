import { call, put, takeLatest } from 'redux-saga/effects'
import productsService from 'service/product'
import runSagas from 'store/sagas'
import types from './actionTypes'

export const loadNewProducts = (limit, category) => ({
  type: types.loadNewProducts,
  payload: {
    limit,
    category,
  },
})

function* loadNewProductsSaga(action) {
  const { limit, category } = action.payload
  const products = yield call(productsService.fetchProducts, limit, category)
  yield put({
    type: types.newProductsLoaded,
    payload: {
      products,
      category,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.loadNewProducts, loadNewProductsSaga)
}

runSagas(getWatchers)
