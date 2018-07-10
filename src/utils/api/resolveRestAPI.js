import { ENDPOINTS } from './constants'

const paramRegex = /^(.*)(\{.*\})(.*)$/
const getMatches = route => route.match(paramRegex)

const getRoute = (endpoint, routeName) => {
  switch (endpoint) {
    case ENDPOINTS.CONTENT:
      return process.env.REST_ENDPOINT + routeName
    case ENDPOINTS.NODE:
      return process.env.NODE_ENDPOINT + routeName
    default:
      return null
  }
}

export default function (routeName, params = {}, endpoint) {
  let route = getRoute(endpoint, routeName)
  let pieces = getMatches(route)
  while (pieces) {
    const [fullString, prePiece, paramPiece, postPiece] = pieces // eslint-disable-line

    const paramName = paramPiece.slice(1, -1)
    const paramValue = params.hasOwnProperty(paramName) ? params[paramName] : env[paramName]

    if (paramValue === undefined) {
      throw new Error(`uError Unable to resolve parameter: "${paramName}" => ${route}`)
    }

    route = prePiece + paramValue + postPiece
    pieces = getMatches(route)
  }

  return route
}
