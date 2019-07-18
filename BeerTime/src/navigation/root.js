import { createSwitchNavigator } from 'react-navigation';
import BeerList from '../containers/BeerList';
import { BEER_LIST } from '../model/const/routeNames';

const appConfig = {
  [BEER_LIST]: { screen: BeerList },
};
export default createSwitchNavigator(appConfig, { initialRouteName: BEER_LIST, headerMode: 'none' });
