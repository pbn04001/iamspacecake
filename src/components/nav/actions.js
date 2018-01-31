import * as types from '../../redux/actionTypes';

export function setMenuActive(isMenuActive) {
  return {
    type: types.MENU_ACTIVE,
    isMenuActive,
  };
}
