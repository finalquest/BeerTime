import AsyncStorage from '@react-native-community/async-storage';
import { UPDATE_IDS } from '../model/const/actionNames';

const updateIdAction = id => ({ type: UPDATE_IDS, value: id });

const updateBeerStorage = (id, dispatch) => AsyncStorage.getItem('beers').then((beer) => {
  const storedBeersId = beer ? JSON.parse(beer) : [];
  const index = storedBeersId.indexOf(id);
  let updatedId;
  if (index !== -1) {
    updatedId = storedBeersId.filter(item => item !== id);
    AsyncStorage.setItem('beers', JSON.stringify(updatedId));
  } else {
    updatedId = [...storedBeersId, id];
    AsyncStorage.setItem('beers', JSON.stringify(updatedId));
  }
  return dispatch(updateIdAction(updatedId));
});

export default updateBeerStorage;
