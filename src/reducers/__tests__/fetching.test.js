import reducer from '../fetching';
import {
  API_TRANSACTION_BEGIN,
  API_TRANSACTION_END,
  API_TRANSACTION_CANCEL,
} from '../../model/const/actionNames';

const createDispatch = (controls) => {
  let state = { fetching: {} };
  return (action) => {
    const control = controls.shift();
    state = { ...reducer(state, action) };
    control(state);
  };
};

describe('fetching reducer test suite', () => {
  test('should return initial state', () => {
    const state = reducer(undefined, {});
    return expect(state).toEqual({});
  });

  test('should set transactions begin and end', () => {
    const testBegin = { type: API_TRANSACTION_BEGIN, key: 'test1' };
    const control = (state) => {
      const expectedState = {
        test1: true,
      };
      return expect(state).toMatchObject(expectedState);
    };
    const otherBegin = { type: API_TRANSACTION_BEGIN, key: 'test2' };
    const control2 = (state) => {
      const expectedState = {
        test1: true,
        test2: true,
      };
      return expect(state).toMatchObject(expectedState);
    };
    const testEnd = { type: API_TRANSACTION_END, key: 'test1' };
    const control3 = (state) => {
      const expectedState = {
        test1: false,
        test2: true,
      };
      return expect(state).toMatchObject(expectedState);
    };

    const dispatch = createDispatch([control, control2, control3]);
    dispatch(testBegin);
    dispatch(otherBegin);
    return dispatch(testEnd);
  });

  test('should cancel transaction when action is cancel', () => {
    const testBegin = { type: API_TRANSACTION_BEGIN, key: 'test1' };
    const controlBegin = (state) => {
      const expectedState = {
        test1: true,
      };
      return expect(state).toMatchObject(expectedState);
    };

    const testCancel = { type: API_TRANSACTION_CANCEL, key: 'test1' };
    const controlCanceled = (state) => {
      const expectedState = {
        test1: false,
      };
      return expect(state).toMatchObject(expectedState);
    };

    const dispatch = createDispatch([controlBegin, controlCanceled]);
    dispatch(testBegin);
    return dispatch(testCancel);
  });
});
