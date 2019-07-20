import { connect } from 'react-redux';
import { Linking } from 'react-native';
import { back } from '../model/actions/navigation';
import BeerDetailScreen from '../screens/BeerDetailScreen';

const mapStateToProps = (_, { navigation: { getParam } }) => ({
  beer: getParam('beer'),
});
const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(back()),
  openBrowser: (param) => {
    const url = `https://www.allrecipes.com/search/results/?wt=${param}`;
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerDetailScreen);
