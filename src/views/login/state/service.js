import api from 'utils/api'

const LoginService = {
  login: (username, password) => api.doFetch('/user/login?_format=json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: username,
      pass: password,
    }),
  })
    .then(response => response)
    .catch(error => ({ error: error.message })),
}

export default LoginService
