import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import newsService from 'service/news'
import types from './actionTypes'

export const getRecentNews = preview => ({
  type: types.getRecentNews,
  payload: {
    preview,
  },
})

function* getRecentNewsSaga(action) {
  const recentNews = yield call(newsService.fetchRecentNews, action.payload.preview)
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
