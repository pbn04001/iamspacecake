import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import types from './actionTypes'
import newsService from './service'

export const getRecentNews = () => ({
  type: types.getRecentNews,
})

function* getRecentNewsSaga() {
  const recentNews = yield call(newsService.fetchRecentNews)
  yield put({
    type: types.updateRecentNews,
    payload: {
      recentNews,
    },
  })
}

export function* getRecentNewsWatcher() {
  yield takeLatest(types.getRecentNews, getRecentNewsSaga)
}

runSagas(getRecentNewsWatcher)
