import * as types from 'store/actionTypes'
import runSagas from 'store/sagas';

export const addItemToShoppingCart = (item) => ({
  type: types.ADD_ITEM_TO_SHOPPING_CART,
  payload: {
    item: item
  }
});