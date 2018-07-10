import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import types from './actionTypes'
import checkoutService from './service'

export const completePurchase = paymentId => ({
  type: types.completePurchase,
  payload: {
    paymentId,
  },
})

function* completePurchaseSaga(action) {
  const { paymentId } = action.payload
  const results = yield call(checkoutService.completePurchase, paymentId)
  yield put({
    type: types.purchaseCompleted,
    payload: {
      results,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.completePurchase, completePurchaseSaga)
}

runSagas(getWatchers)
