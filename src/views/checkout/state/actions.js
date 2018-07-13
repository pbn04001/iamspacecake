import { put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import cartActionTypes from 'components/shoppingCart/state/actionTypes'
import types from './actionTypes'

export const purchaseComplete = results => ({
  type: types.purchaseComplete,
  payload: {
    results,
  },
})

function* purchaseCompleteSaga() {
  yield put({
    type: cartActionTypes.emptyShoppingCart,
  })
}

export function* getWatchers() {
  yield takeLatest(types.purchaseComplete, purchaseCompleteSaga)
}

runSagas(getWatchers)
