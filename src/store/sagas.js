import createSagaMiddleware from 'redux-saga'

let sagaMiddleware = null

export function reduxSagaMiddleware() {
  sagaMiddleware = createSagaMiddleware()
  return sagaMiddleware
}

export default function runSagas(...sagas) {
  if (!sagaMiddleware) {
    throw new Error('Saga middleware is not setup!')
  }
  sagas.forEach((saga) => {
    if (typeof saga !== 'function') {
      throw new Error('Saga needs to be a generator function')
    }
    sagaMiddleware.run(saga)
  })
}
