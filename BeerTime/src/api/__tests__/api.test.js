import configureStore from 'redux-mock-store';
import { API_TRANSACTION_BEGIN, API_TRANSACTION_END, API_TRANSACTION_ERROR } from '../../model/const/actionNames';
import apiMiddleware from '../../middlewares/api';

const TIMEOUT_DEFAULT = 2000;

const middlewares = [apiMiddleware];
const initialState = {
  api: {
    fetching: {},
  },
};

const mockStore = configureStore(middlewares);

describe('Api middleware common test suite', () => {
  beforeEach(() => {
    jest.useRealTimers();
    fetch.resetMocks();
  });

  test('dispatches normal action if no request', () => {
    const store = mockStore(initialState);
    const action = { type: 'test', value: 'test' };

    store.dispatch(action);
    const actions = store.getActions();
    expect(actions).toEqual([action]);
  });

  test('dispatches error action if session error code does not match', () => {
    const store = mockStore(initialState);

    const request = { url: 'test.com', id: 'id' };
    const action = { type: 'custom', request };

    const body = JSON.stringify({ data: 'result' });
    fetch.once(body, { status: 403, statusText: 'asd' });

    return expect(store.dispatch(action)
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([
          { type: 'API_TRANSACTION_BEGIN', key: 'custom-id' },
          { type: 'API_TRANSACTION_ERROR', key: 'custom-id', error: expect.any(Error) },
          { type: 'API_TRANSACTION_END', key: 'custom-id' }]);
      })).resolves.toBeUndefined();
  });

  test('dispatches custom action with api fetch result if success', () => {
    const body = JSON.stringify({ data: 'result' });
    fetch.once(body);

    const store = mockStore(initialState);
    const request = { url: 'test.com', id: 'id' };
    const action = { type: 'custom', request };
    const key = 'custom-id';

    return expect(store.dispatch(action)
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([
          { type: API_TRANSACTION_BEGIN, key },
          {
            type: 'custom',
            request,
            value: { data: 'result' },
          },
          { type: API_TRANSACTION_END, key },
        ]);
        expect(fetch.mock.calls[0][0]).toEqual('test.com');
      })).resolves.toBeUndefined();
  });

  test('data is added as params if GET request', () => {
    const body = JSON.stringify({ data: 'result' });
    fetch.once(body);

    const store = mockStore(initialState);
    const data = { string: 'a' };
    const request = { url: 'test.com', data };
    const action = { type: 'custom', request };
    const key = 'custom';

    return expect(store.dispatch(action)
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([
          { type: API_TRANSACTION_BEGIN, key },
          {
            type: 'custom',
            request,
            value: { data: 'result' },
          },
          { type: API_TRANSACTION_END, key },
        ]);
        expect(fetch.mock.calls[0][0]).toEqual('test.com?string=a');
      })).resolves.toBeUndefined();
  });

  test('dispatches api error if response is not ok', () => {
    const statusText = 'Not Found';
    const body = JSON.stringify({ data: 'result' });
    fetch.once(body, { status: 404, statusText });

    const store = mockStore(initialState);
    const request = { url: 'test.com' };
    const error = new Error(statusText);
    const key = 'custom';

    return expect(store.dispatch({ type: 'custom', request })
      .then(() => {
        const actions = store.getActions();
        const resultError = actions[1].error;
        expect(actions).toEqual([
          { type: API_TRANSACTION_BEGIN, key },
          { type: API_TRANSACTION_ERROR, key, error },
          { type: API_TRANSACTION_END, key },
        ]);
        expect(resultError.message).toEqual(statusText);
        expect(resultError.response).not.toBeUndefined();
        expect(resultError.responseError).not.toBeUndefined();
        expect(resultError.options).not.toBeUndefined();
      })).resolves.toBeUndefined();
  });

  test('dispatches api error if network error happens', () => {
    const error = new Error('Network request failed');
    fetch.mockRejectOnce(error);

    const store = mockStore(initialState);
    const request = { url: 'test.com' };
    const key = 'custom';

    return expect(store.dispatch({ type: 'custom', request })
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([
          { type: API_TRANSACTION_BEGIN, key },
          { type: API_TRANSACTION_ERROR, key, error },
          { type: API_TRANSACTION_END, key },
        ]);
      })).resolves.toBeUndefined();
  });
});

describe('Api middleware options test suite', () => {
  beforeEach(() => {
    jest.useRealTimers();
    fetch.resetMocks();
  });

  // content option
  test('api fetch uses content option', () => {
    const body = 'response';
    fetch.once(body);

    const store = mockStore(initialState);
    const options = { content: 'text', timeout: TIMEOUT_DEFAULT };
    const request = { url: 'test.com', options };
    const action = { type: 'custom', request };

    return expect(store.dispatch(action)
      .then(() => {
        const { headers } = fetch.mock.calls[0][1];
        expect(headers['content-type']).toEqual('application/x-www-form-urlencoded ; charset=UTF-8');
        const expectedAction = {
          type: 'custom', request, value: 'response',
        };
        expect(store.getActions()[1]).toEqual(expectedAction);
      })).resolves.toBeUndefined();
  });

  // formatter option
  test('api fetch uses formatter option', () => {
    const body = JSON.stringify({ data: 'result' });
    fetch.once(body);

    const store = mockStore(initialState);
    const options = {
      formatter: (response => ({ formatted: response.data })),
      timeout: TIMEOUT_DEFAULT,
    };
    const request = { url: 'test.com', options };
    const action = { type: 'custom', request };

    return expect(store.dispatch(action)
      .then(() => {
        const expectedAction = {
          type: 'custom', request, value: { formatted: 'result' },
        };
        expect(store.getActions()[1]).toEqual(expectedAction);
      })).resolves.toBeUndefined();
  });

  // headers option
  test('api fetch uses headers option', () => {
    const body = JSON.stringify({ data: 'result' });
    fetch.once(body);

    const store = mockStore(initialState);
    const options = { headers: { 'x-custom-header': 'test' }, timeout: TIMEOUT_DEFAULT };
    const request = { url: 'test.com', options };
    const action = { type: 'custom', request };

    return expect(store.dispatch(action)
      .then(() => {
        const { headers } = fetch.mock.calls[0][1];
        expect(headers['x-custom-header']).toEqual('test');
      })).resolves.toBeUndefined();
  });

  // type option
  test('api fetch uses headers option', () => {
    const body = JSON.stringify({ data: 'result' });
    fetch.once(body);

    const store = mockStore(initialState);
    const options = { type: 'commit', timeout: TIMEOUT_DEFAULT };
    const request = { url: 'test.com', options, body: { data: 'text' } };
    const action = { type: 'custom', request };

    return expect(store.dispatch(action)
      .then(() => {
        const { method } = fetch.mock.calls[0][1];
        expect(method).toEqual('POST');
      })).resolves.toBeUndefined();
  });


  // operationError, operationErrorMessage options
  test('network error message can be customized if needed', () => {
    const error = new Error('Network request failed');
    fetch.mockRejectOnce(error);

    const store = mockStore(initialState);
    const operationErrorMessage = 'custom message';
    const options = { operationError: true, operationErrorMessage, timeout: TIMEOUT_DEFAULT };
    const request = { url: 'test.com', options };
    const key = 'custom';

    return expect(store.dispatch({ type: 'custom', request })
      .then(() => {
        const actions = store.getActions();
        const resultError = actions[1].error.responseError;
        expect(actions).toEqual([
          { type: API_TRANSACTION_BEGIN, key },
          { type: API_TRANSACTION_ERROR, key, error },
          { type: API_TRANSACTION_END, key },
        ]);
        expect(resultError.message).toEqual(operationErrorMessage);
        expect(actions[1].error.options).not.toBeUndefined();
      })).resolves.toBeUndefined();
  });

  test('network error message needs operationError to be customized', () => {
    const error = new Error('Network request failed');
    fetch.mockRejectOnce(error);

    const store = mockStore(initialState);
    const operationErrorMessage = 'custom message';
    const options = { operationErrorMessage, timeout: TIMEOUT_DEFAULT };
    const request = { url: 'test.com', options };
    const key = 'custom';

    return expect(store.dispatch({ type: 'custom', request })
      .then(() => {
        const actions = store.getActions();
        const resultError = actions[1].error;
        expect(actions).toEqual([
          { type: API_TRANSACTION_BEGIN, key },
          { type: API_TRANSACTION_ERROR, key, error },
          { type: API_TRANSACTION_END, key },
        ]);
        expect(resultError.message).not.toEqual(operationErrorMessage);
      })).resolves.toBeUndefined();
  });

  // timeout option (default time is 30sec)
  test('supports timeout', () => {
    jest.useFakeTimers();
    const store = mockStore(initialState);
    const options = { timeout: 3000 };
    const request = { url: 'test.com', options };
    const key = 'custom';

    const action = { type: 'custom', request };
    return expect(store.dispatch(action)
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([
          { type: API_TRANSACTION_BEGIN, key },
          { type: API_TRANSACTION_ERROR, key, error: expect.any(Error) },
          { type: API_TRANSACTION_END, key },
        ]);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
      })).resolves.toBeUndefined();
  });
});

describe('Api action result merge test suite', () => {
  const mockApiAction = (callback, value) => {
    const store = mockStore(initialState);
    const action = {
      type: 'custom',
      request: { url: 'test.com' },
      value,
    };
    return expect(store.dispatch(action)
      .then(() => {
        const actions = store.getActions();
        callback(actions[1]);
      })).resolves.toBeUndefined();
  };
  beforeEach(() => {
    jest.useRealTimers();
    fetch.resetMocks();
  });
  test('fetch result as value if no input value is given', () => {
    const body = JSON.stringify({ data: 'result' });
    const value = undefined;
    fetch.once(body);
    return mockApiAction((action) => {
      expect(action).toMatchObject({
        value: { data: 'result' },
      });
    }, value);
  });
  test('input value as value if no fetch result data', () => {
    const body = '';
    const value = { data: 'result' };
    fetch.once(body);
    return mockApiAction((action) => {
      expect(action).toMatchObject({
        value: { data: 'result' },
      });
    }, value);
  });
  test('merge if both input and result are object', () => {
    const body = JSON.stringify({ data: 'result', other: 'ot' });
    const value = { data: 'merge' };
    fetch.once(body);
    return mockApiAction((action) => {
      expect(action).toMatchObject({
        value: { data: 'merge', other: 'ot' },
      });
    }, value);
  });
  test('input as field if result is object', () => {
    const body = JSON.stringify({ data: 'result' });
    const value = 'test';
    fetch.once(body);
    return mockApiAction((action) => {
      expect(action).toMatchObject({
        value: { data: 'result', value: 'test' },
      });
    }, value);
  });
  test('result as field is input is object', () => {
    fetch.once('test');
    const value = { data: 'result' };
    return mockApiAction((action) => {
      expect(action).toMatchObject({
        value: { data: 'result', result: 'test' },
      });
    }, value);
  });
  test('supports arrays', () => {
    const body = JSON.stringify(['response']);
    const value = ['test'];
    fetch.once(body);
    return mockApiAction((action) => {
      expect(action).toMatchObject({
        value: { value: ['test'], result: ['response'] },
      });
    }, value);
  });
});
