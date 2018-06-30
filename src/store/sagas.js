
/**
 * This file contains a utility method that can be used by views that need to run their sagas.
 * For example Claims view details adds a Redux-Saga to get details of a Claim.
 * /src/views/claims/list/state/actions adds a saga
 * function* fetchClaimsSaga() {...}
 *
 * All it needs now is import the helper method.
 * import runSags from 'store/sagas';
 *
 * Call this method by passing a list of saga/s that you need to run.
 * runSagas(fetchClaimsSaga);
 * That's it!
 */

import createSagaMiddleware from 'redux-saga';

let sagaMiddleware = null;

export function reduxSagaMiddleware() {
  sagaMiddleware = createSagaMiddleware();
  return sagaMiddleware;
}

// Helper method used by various views to run their sagas.
export default function runSagas(...sagas) {
  if (!sagaMiddleware) {
    throw new Error('Saga middleware is not setup!');
  }
  sagas.forEach(saga => {
    if (typeof saga !== 'function') {
      throw new Error('Saga needs to be a generator function');
    }
    sagaMiddleware.run(saga);
  });
}
