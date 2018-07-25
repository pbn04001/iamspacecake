import types from './actionTypes'

const initialState = {
  messageSentResults: null,
}

function contact(state = initialState, action) {
  switch (action.type) {
    case types.messageSent:
      return {
        ...state,
        results: action.payload.results,
      }
    default:
      return state
  }
}

export default contact
