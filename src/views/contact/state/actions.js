import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import contactService from 'service/contact'
import types from './actionTypes'

export const sendMessage = args => ({
  type: types.sendMessage,
  payload: {
    ...args,
  },
})

function* sendMessageSaga(action) {
  const results = yield call(contactService.sendMessage, action.payload)
  yield put({
    type: types.messageSent,
    payload: {
      results,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.sendMessage, sendMessageSaga)
}

runSagas(getWatchers)
