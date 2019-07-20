import { createSwitchNavigator } from 'react-navigation';
import BeerList from '../containers/BeerList';
import { BEER_LIST, BEER_DETAIL } from '../model/const/routeNames';
import BeerDetail from '../containers/BeerDetail';

const appConfig = {
  [BEER_LIST]: { screen: BeerList },
  [BEER_DETAIL]: { screen: BeerDetail },
};
export default createSwitchNavigator(appConfig, { initialRouteName: BEER_LIST, headerMode: 'none' });
