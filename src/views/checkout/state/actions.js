import types from './actionTypes'

export const startPurchase = () => ({
  type: types.startPurchase,
})

export const purchaseComplete = results => ({
  type: types.purchaseComplete,
  payload: {
    results,
  },
})
