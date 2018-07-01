import * as types from 'store/actionTypes'

export function setMenuActive(isMenuActive) {
  return dispatch => dispatch(
    {
      type: types.MENU_ACTIVE,
      isMenuActive,
    },
  )
}

export default setMenuActive
