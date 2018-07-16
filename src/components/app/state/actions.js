import types from './actionTypes'

export const setMenuActive = isMenuActive => ({
  type: types.setMenuActive,
  payload: {
    isMenuActive,
  },
})
