import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import BackArrow from '../components/BackArrow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'gray',
  },
});

const BeerDetailScreen = ({ onBack }) => (
  <View style={styles.container}>
    <View style={{ alignSelf: 'stretch' }}>
      <BackArrow onPress={onBack} />
    </View>
  </View>
);

BeerDetailScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
};

BeerDetailScreen.defaultProps = {

};

export default BeerDetailScreen;
