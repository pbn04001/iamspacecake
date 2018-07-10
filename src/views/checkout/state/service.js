import api, { ENDPOINTS } from 'utils/api'

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
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default CheckoutService
