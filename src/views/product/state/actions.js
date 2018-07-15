import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import productsService from 'service/product'
import types from './actionTypes'

export const loadProduct = productId => ({
  type: types.loadProduct,
  payload: {
    productId,
  },
})

export const toggleModal = open => ({
  type: types.toggleModal,
  payload: {
    open,
  },
})

function* loadProductSaga(action) {
  const { productId } = action.payload
  const product = yield call(productsService.fetchProduct, productId)
  yield put({
    type: types.productLoaded,
    payload: {
      product,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.loadProduct, loadProductSaga)
}

runSagas(getWatchers)
