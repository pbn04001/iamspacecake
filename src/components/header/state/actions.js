/*
import { call, put, takeLatest } from 'redux-saga/effects'
import productsService from 'service/product'
import runSagas from 'store/sagas' */
import types from './actionTypes'

export const startSearch = () => ({
  type: types.startSearch,
})

export const closeSearch = () => ({
  type: types.closeSearch,
})

/*
function* loadNewProductsSaga(action) {
  const { category } = action.payload
  const products = yield call(productsService.fetchNewProducts, category)
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

runSagas(getWatchers) */
