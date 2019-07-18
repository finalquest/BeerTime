
import apiAction from '../base';

describe('base api test suite', () => {
  it('should dispatch correct actions if response is correct', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    return apiAction({ type: 'action', request: { url: 'url' } }, next)(dispatch).then(() => {
      expect(dispatch).toHaveBeenNthCalledWith(1,
        {
          key: 'action',
          type: 'API_TRANSACTION_BEGIN',
        });
      expect(dispatch).toHaveBeenNthCalledWith(2,
        {
          error: undefined, request: { url: 'url' }, type: 'action', value: '',
        });
      expect(dispatch).toHaveBeenNthCalledWith(3,
        {
          key: 'action',
          type: 'API_TRANSACTION_END',
        });
    });
  });
});
