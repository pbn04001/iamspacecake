import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import productsService from 'service/product'
import types from './actionTypes'

export const getNewArrivals = () => ({
  type: types.getNewArrivals,
})

function* getNewArrivalsSaga() {
  const newArrivals = yield call(productsService.fetchNewArrivals)
  yield put({
    type: types.updateNewArrivals,
    payload: {
      newArrivals,
    },
  })
}

export function* addWatchers() {
  yield takeLatest(types.getNewArrivals, getNewArrivalsSaga)
}

runSagas(addWatchers)
