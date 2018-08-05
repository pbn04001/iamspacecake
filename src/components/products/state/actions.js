import { call, put, takeEvery } from 'redux-saga/effects'
import productsService from 'service/product'
import runSagas from 'store/sagas'
import types from './actionTypes'

export const loadNewProducts = category => ({
  type: types.loadNewProducts,
  payload: {
    category,
  },
})

function* loadNewProductsSaga(action) {
  const { category } = action.payload
  const products = yield call(productsService.fetchProductsRecent, category)
  yield put({
    type: types.newProductsLoaded,
    payload: {
      products,
      category,
    },
  })
}

export function* getWatchers() {
  yield takeEvery(types.loadNewProducts, loadNewProductsSaga)
}

runSagas(getWatchers)
