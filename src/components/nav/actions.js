import * as types from 'store/actionTypes'

export function setMenuActive(isMenuActive) {
  return dispatch => {
    return dispatch(
      { type: types.MENU_ACTIVE,
        isMenuActive
      }
    )
  }
}
