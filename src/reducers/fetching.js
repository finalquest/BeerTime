import {
  API_TRANSACTION_BEGIN,
  API_TRANSACTION_END,
  API_TRANSACTION_CANCEL,
} from '../model/const/actionNames';

const initialState = {
};

const fetching = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case API_TRANSACTION_BEGIN:
    case API_TRANSACTION_CANCEL:
    case API_TRANSACTION_END: {
      const { key: endpoint } = action;
      const value = type === API_TRANSACTION_BEGIN;
      return { ...state, [endpoint]: value };
    }
    default:
      return state;
  }
};

export default fetching;
