import types from './actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case types.requestLoading:
      return {
        ...state,
        [action.payload.requestName]: 'loading',
      }

    case types.requestError:
      return {
        ...state,
        [action.payload.requestName]: 'error',
      }

    case types.requestSuccess:
      return {
        ...state,
        [action.payload.requestName]: 'success',
      }

    default:
      return state
  }
}
