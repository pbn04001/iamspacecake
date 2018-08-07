import api from 'utils/api'
import { ENDPOINTS } from 'utils/api/constants'

const CartService = {
  retrievePayment: paymentId => api.doFetch(`/product/retrieve-payment/${paymentId}`, {
    method: 'GET',
    endpoint: ENDPOINTS.NODE,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default CartService
