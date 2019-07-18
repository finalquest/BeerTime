
import apiAction from '../base';

describe('base api test suite', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should dispatch correct actions if response is correct', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const body = JSON.stringify({ data: 'data' });
    fetch.once(body, { status: 200 });
    return apiAction({ type: 'action', request: { url: 'url' } }, next)(dispatch).then(() => {
      expect(dispatch).toHaveBeenNthCalledWith(1,
        {
          key: 'action',
          type: 'API_TRANSACTION_BEGIN',
        });
      expect(dispatch).toHaveBeenNthCalledWith(2,
        {
          key: 'action',
          type: 'API_TRANSACTION_END',
        });
    });
  });

  it('should dispatch correct actions if response is error', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    fetch.once('', { status: 400 });

    return apiAction({ type: 'action', request: { url: 'url' } }, next)(dispatch).then(() => {
      expect(dispatch).toHaveBeenNthCalledWith(1,
        {
          key: 'action',
          type: 'API_TRANSACTION_BEGIN',
        });
      expect(dispatch).toHaveBeenNthCalledWith(2,
        expect.objectContaining({ key: 'action', type: 'API_TRANSACTION_ERROR' }));
    });
  });
});
