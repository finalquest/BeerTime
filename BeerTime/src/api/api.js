import param from 'jquery-param';

const ACTION_METHOD = {
  commit: 'POST',
  delete: 'DELETE',
  update: 'PUT',
};

const verb = type => ACTION_METHOD[type] || 'GET';

const parseResponse = (response) => {
  let result;
  return response.text()
    .then((text) => {
      result = text;
      return JSON.parse(text);
    })
    .catch(() => result);
};

const checkStatus = (options = {}, response = {}) => {
  const { ok, statusText } = response;
  if (!ok) {
    return parseResponse(response)
      .then((responseError) => {
        const error = new Error(responseError.code || responseError.message || statusText);
        error.response = response;
        error.responseError = responseError;
        error.options = options;
        throw error;
      });
  }
  return response;
};

const getErrorMessage = ({ responseError }) => {
  if (typeof (responseError) === 'string') {
    return responseError;
  }
  return responseError.message || 'unknown_error';
};

const getErrorCause = ({ responseError = {} }) => responseError.cause || 'unknown_error';

const handleNetworkError = (options = {}, error = {}) => {
  const { operationError, operationErrorMessage } = options;
  if ((!error.stack || error.response) && error.responseError) {
    const errorMessage = getErrorMessage(error);
    const errorCause = getErrorCause(error);
    const newError = error;
    newError.responseError = {
      ...error.responseError,
      message: errorMessage,
      cause: errorCause,
    };
    throw newError;
  }

  let code = error.message || 'unknown_error';
  if (code === 'Network request failed' && operationError) {
    code = operationErrorMessage || 'unknown_operation_error';
  }

  const newError = error;
  newError.responseError = {
    message: code,
  };
  newError.options = options;
  throw newError;
};

const sendAny = (url, method = 'GET', commonHeaders, options = {}, body, credentials = 'include') => {
  const { headers: customHeaders, timeout = 30000 } = options;
  const headers = { ...commonHeaders, ...customHeaders };
  const config = {
    method,
    headers,
    body,
    credentials,
  };
  const delay = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Network request failed')), timeout));
  return Promise.race([fetch(url, config), delay()])
    .catch((err) => {
      const error = err;
      error.url = url;
      error.options = options;
      throw error;
    });
};

const sendJson = (baseUrl, method = 'GET', options = {}, jsonBody, credentials = 'include') => {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'Cache-Control': 'no-cache',
  };
  const needBodyAsParams = jsonBody && method === 'GET';
  const url = needBodyAsParams ? `${baseUrl}?${param(jsonBody).split('%5B%5D').join('')}` : baseUrl;
  const body = needBodyAsParams ? undefined : JSON.stringify(jsonBody);
  return sendAny(url, method, headers, options, body, credentials);
};

const sendString = (baseUrl, method = 'GET', options = {}, txtBody, credentials = 'include') => {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded ; charset=UTF-8',
    'Cache-Control': 'no-cache',
  };
  const needBodyAsParams = txtBody && method === 'GET';
  const url = needBodyAsParams ? `${baseUrl}?${txtBody}` : baseUrl;
  const body = needBodyAsParams ? undefined : txtBody;
  return sendAny(url, method, headers, options, body, credentials);
};

const call = (url, method = 'GET', options = {}, body, credentials = 'include') => {
  const { content, formatter } = options;
  const resolver = formatter || (response => response);
  const sendContent = content === 'text' ? sendString : sendJson;
  const send = sendContent.bind(this, url, method, options, body, credentials);
  return send()
    .then(checkStatus.bind(this, options))
    .then(parseResponse)
    .then(resolver)
    .then(response => ({ response }))
    .catch(handleNetworkError.bind(this, options));
};

const apiCall = (url, data = undefined, options = {}) => {
  const { type } = options;
  const path = url;
  const method = verb(type);
  return call(path, method, options, data);
};

export default apiCall;
