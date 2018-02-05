import * as types from '../../redux/actionTypes'

export function setMenuActive(isMenuActive) {
  return dispatch => {
    return dispatch(
      { type: types.MENU_ACTIVE, isMenuActive }
    )
  }
}
