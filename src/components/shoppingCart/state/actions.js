import * as types from 'store/actionTypes'

export const addItemToShoppingCart = item => ({
  type: types.ADD_ITEM_TO_SHOPPING_CART,
  payload: {
    item,
  },
})

export default addItemToShoppingCart
