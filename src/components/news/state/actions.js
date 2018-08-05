import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import newsService from 'service/news'
import types from './actionTypes'

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

export function* addWatchers() {
  yield takeLatest(types.getRecentNews, getRecentNewsSaga)
}

runSagas(addWatchers)
