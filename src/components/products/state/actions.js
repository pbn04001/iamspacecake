import { call, put, takeLatest } from 'redux-saga/effects'
import productsService from 'service/product'
import runSagas from 'store/sagas'
import types from './actionTypes'

export const loadNewProducts = () => ({
  type: types.loadNewProducts,
})

function* loadNewProductsSaga() {
  const products = yield call(productsService.fetchProducts, 4)
  yield put({
    type: types.newProductsLoaded,
    payload: {
      products,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.loadNewProducts, loadNewProductsSaga)
}

runSagas(getWatchers)
