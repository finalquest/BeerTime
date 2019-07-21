import apiAction from '../api/base';

export const TIMEOUT_DEFAULT = 30000;

const reduxApi = store => next => (action) => {
  const isFunction = typeof action === 'function';
  if (!isFunction) {
    const { request } = action;
    if (request) {
      return apiAction(action, next)(store.dispatch);
    }
  }
  return next(action);
};

export default reduxApi;
