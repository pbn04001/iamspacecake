import types from './actionTypes'

function requestLoading(requestName) {
  return { type: types.requestLoading, payload: { requestName } }
}

function requestError(requestName, error) {
  return { type: types.requestError, payload: { requestName, error } }
}

function requestSuccess(requestName) {
  return { type: types.requestSuccess, payload: { requestName } }
}

export default {
  requestLoading,
  requestError,
  requestSuccess,
}
