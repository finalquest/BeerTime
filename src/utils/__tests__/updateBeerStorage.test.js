import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import AsyncStorage from '@react-native-community/async-storage';
import { updateBeerStorage, getBeersFromStorage } from '../updateBeerStorage';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

describe('updateBeerStorage test suite', () => {
  it('should update storage', () => {
    mockAsyncStorage.getItem = jest.fn(() => new Promise((resolve) => {
      resolve(JSON.stringify([1]));
    }));

    const dispatch = jest.fn();
    return updateBeerStorage(2, dispatch).then(() => {
      expect(AsyncStorage.setItem).toBeCalledWith('beers', '[1,2]');
    });
  });

  it('should remove storage if exist', () => {
    mockAsyncStorage.getItem = jest.fn(() => new Promise((resolve) => {
      resolve(JSON.stringify([1]));
    }));

    const dispatch = jest.fn();
    return updateBeerStorage(1, dispatch).then(() => {
      expect(AsyncStorage.setItem).toBeCalledWith('beers', '[]');
    });
  });

  it('should work if no ids stored', () => {
    mockAsyncStorage.getItem = jest.fn(() => new Promise((resolve) => {
      resolve(undefined);
    }));

    const dispatch = jest.fn();
    return updateBeerStorage(3, dispatch).then(() => {
      expect(AsyncStorage.setItem).toBeCalledWith('beers', '[3]');
    });
  });

  it('should get items', () => {
    mockAsyncStorage.getItem = jest.fn(() => new Promise((resolve) => {
      resolve(undefined);
    }));

    const dispatch = jest.fn();
    return getBeersFromStorage(dispatch).then(() => {
      expect(AsyncStorage.getItem).toBeCalled();
      expect(dispatch).toBeCalledWith({ type: 'UPDATE_IDS', value: [] });
    });
  });
});
