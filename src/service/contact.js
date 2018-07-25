import api from 'utils/api'
import { ENDPOINTS } from 'utils/api/constants'

const ContactService = {
  sendMessage: args => api.doFetch('/contact/send-message', {
    method: 'POST',
    endpoint: ENDPOINTS.NODE,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default ContactService
