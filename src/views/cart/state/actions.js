import runSagas from 'store/sagas'
import { put, takeLatest } from 'redux-saga/effects'
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

export const emptyCart = () => ({
  type: types.emptyShoppingCart,
})

function* purchaseCompleteSaga() {
  yield put({
    type: types.emptyShoppingCart,
  })
}

export function* getWatchers() {
  yield takeLatest(types.purchaseComplete, purchaseCompleteSaga)
}

runSagas(getWatchers)
