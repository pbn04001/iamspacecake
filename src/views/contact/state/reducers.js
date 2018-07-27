import types from './actionTypes'

const initialState = {
  messageSentResults: null,
}

function contact(state = initialState, action) {
  switch (action.type) {
    case types.messageSent:
      return {
        ...state,
        messageSentResults: action.payload.results,
      }
    case types.clearResults:
      return {
        ...state,
        messageSentResults: null,
      }
    default:
      return state
  }
}

export default contact
