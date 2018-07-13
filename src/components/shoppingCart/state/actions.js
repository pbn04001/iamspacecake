import types from './actionTypes'

export const addItemToShoppingCart = item => ({
  type: types.addItemToShoppingCart,
  payload: {
    item,
  },
})
