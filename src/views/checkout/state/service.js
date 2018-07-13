import api from 'utils/api'
import { ENDPOINTS } from 'utils/api/constants'

const CheckoutService = {
  completePurchase: paymentId => api.doFetch('/product/complete-purchase', {
    method: 'POST',
    endpoint: ENDPOINTS.NODE,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paymentId,
    }),
  })
    .catch(error => ({ error })),
}

export default CheckoutService
