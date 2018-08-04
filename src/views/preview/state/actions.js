import { call, put, takeLatest } from 'redux-saga/effects'
import productsService from 'service/product'
import runSagas from 'store/sagas'
import types from './actionTypes'

export const loadProducts = category => ({
  type: types.loadProducts,
  payload: {
    category,
  },
})

function* loadProductsSaga(action) {
  const { category } = action.payload
  const products = yield call(productsService.fetchProductsPreview, category)
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
