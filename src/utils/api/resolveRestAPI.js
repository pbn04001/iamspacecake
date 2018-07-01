const restUrl = process.env.REST_ENDPOINT
const paramRegex = /^(.*)(\{.*\})(.*)$/

const getMatches = route => route.match(paramRegex)

export default function (routeName, params = {}) {
  let route = restUrl + routeName
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
