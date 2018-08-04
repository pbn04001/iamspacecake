import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import types from './actionTypes'
import productsService from 'service/product'

export const getRecentNews = () => ({
  type: types.getRecentNews,
})

function* getRecentNewsSaga() {
  const recentNews = yield call(productsService.fetchNewProducts)
  yield put({
    type: types.updateRecentNews,
    payload: {
      recentNews,
    },
  })
}

export function* addWatchers() {
  yield takeLatest(types.getRecentNews, getRecentNewsSaga)
}

runSagas(addWatchers)
