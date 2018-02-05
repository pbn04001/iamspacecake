import * as types from '../../redux/actionTypes'

const initialState = {
  isMenuActive: false
};

function nav(state = initialState, action) {
  switch (action.type) {
    case types.MENU_ACTIVE:
      return {
        ...state,
        isMenuActive: action.isMenuActive
      }
    default:
      return state
  }
}

export default nav
