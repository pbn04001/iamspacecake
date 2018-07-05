import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import types from './actionTypes'
import loginService from './service'

export const startLogin = (username, password) => ({
  type: types.startLogin,
  payload: {
    username,
    password,
  },
})

function* startLoginSaga(action) {
  const { username, password } = action.payload
  const currentUser = yield call(loginService.login, username, password)
  yield put({
    type: types.loginUpdate,
    payload: {
      currentUser,
    },
  })
}

export function* getWatchers() {
  yield takeLatest(types.startLogin, startLoginSaga)
}

runSagas(getWatchers)
