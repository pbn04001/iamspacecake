import api from 'utils/api'

const LoginService = {
  login: (username, password) => api.doFetch('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/hal+json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default LoginService
