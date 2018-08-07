import runSagas from 'store/sagas'
import { put, call, takeLatest } from 'redux-saga/effects'
import cartService from 'service/cart'
import types from './actionTypes'

export const viewDidMount = () => ({
  type: types.viewDidMount,
})

export const addItemToShoppingCart = item => ({
  type: types.addItemToShoppingCart,
  payload: {
    item,
  },
})

export const removeItemFromShoppingCart = item => ({
  type: types.removeItemFromShoppingCart,
  payload: {
    item,
  },
})

export const toggleErrorModal = (visible, title, body) => ({
  type: types.toggleErrorModal,
  payload: {
    visible,
    title,
    body,
  },
})

export const purchaseComplete = results => ({
  type: types.purchaseComplete,
  payload: {
    results,
  },
})

export const retrievePayment = (paymentId) => ({
  type: types.retrievePayment,
  payload: {
    paymentId,
  },
})

export const emptyCart = () => ({
  type: types.emptyShoppingCart,
})

function* purchaseCompleteSaga() {
  yield put({
    type: types.emptyShoppingCart,
  })
}

function* retrievePaymentSaga(action) {
  const results = yield call(cartService.retrievePayment, action.payload.paymentId)
  yield put({
    type: types.paymentRetrieved,
    payload: {
      results,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.purchaseComplete, purchaseCompleteSaga)
  yield takeLatest(types.retrievePayment, retrievePaymentSaga)
}

runSagas(getWatchers)
