
import apiCall from './api';
import merge from '../utils/merge';
import { API_TRANSACTION_BEGIN, API_TRANSACTION_END, API_TRANSACTION_ERROR } from '../model/const/actionNames';

const apiAction = fullAction => (dispatch) => {
  const { ...action } = fullAction;
  const {
    request, value, type,
  } = action;
  const {
    url, data, options, id,
  } = request;
  // API action
  const key = id ? `${type}-${id}` : type;
  const resolve = dispatch;
  dispatch({ type: API_TRANSACTION_BEGIN, key });
  return apiCall(url, data, options)
    .then(({ response, error }) => resolve({ ...action, value: merge(value, response, 'value', 'result'), error }))
    .catch(error => dispatch({ type: API_TRANSACTION_ERROR, key, error }))
    .then((result) => {
      dispatch({ type: API_TRANSACTION_END, key });
      return result;
    });
};

export default apiAction;
