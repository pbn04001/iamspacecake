import store from 'store'
import humps from 'humps'
import actions from './state/actions'
import { ENDPOINTS } from './constants'
import resolveRestAPI from './resolveRestAPI'

const validateStatus = (response) => {
  if (response.status < 200 || response.status >= 300) {
    throw Object.assign(new Error(response.statusText), { data: response })
  }
}

const DEFAULT_OPTIONS = {
  // Fetch options
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  urlParams: {}, // Used when looking up URL from env config above

  // Handling response options
  jsonOutput: true, // Transform response to JSON
  camelizeKeys: true, // For json output, camelize response keys with humps library
  shouldValidateStatus: true, // Ensure a 200 status response
  isMonitored: true, // Store request state in store when true
  endpoint: ENDPOINTS.CONTENT,
}

function doFetch(routeName, options = {}) {
  if (!store) {
    return Promise.reject(new Error('API util error, store not initialized'))
  }

  const {
    jsonOutput,
    camelizeKeys,
    shouldValidateStatus,
    urlParams,
    isMonitored,
    endpoint,
    ...fetchOptions
  } = { ...DEFAULT_OPTIONS, ...options }

  fetchOptions.credentials = 'omit'
  fetchOptions.headers = {
    ...fetchOptions.headers,
  }
  // Shims browser supports web fetch but not URLSearchParams
  // Manually set the header to `application/x-www-form-urlencoded charset=UTF-8`
  // - https://github.com/jerrybendy/url-search-params-polyfill#known-issues.
  if (options.body instanceof URLSearchParams) {
    fetchOptions.headers.set('Content-Type', 'application/x-www-form-urlencoded charset=UTF-8')
  }

  const routeUrl = resolveRestAPI(routeName, urlParams, endpoint)

  return Promise.resolve()
    .then(() => isMonitored && store.dispatch(actions.requestLoading(routeName)))
    .then(() => fetch(routeUrl, fetchOptions))
    .then((response) => {
      if (shouldValidateStatus) {
        validateStatus(response, routeName)
      }
      return response
    })
    .then((response) => {
      let ret = response
      if (jsonOutput) {
        ret = ret.json()

        if (camelizeKeys) {
          ret = ret.then(jsonIter => humps.camelizeKeys(jsonIter))
        }
      }

      return ret
    })
    .then((response) => {
      if (isMonitored) store.dispatch(actions.requestSuccess(routeName))
      return response
    })
    .catch((error) => {
      if (isMonitored) store.dispatch(actions.requestError(routeName, error))
      throw error
    })
}

export default {
  doFetch,
}

export {
  validateStatus,
}
