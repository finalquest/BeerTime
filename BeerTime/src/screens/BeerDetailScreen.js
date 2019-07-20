import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import BackArrow from '../components/BackArrow';
import { BeerProptype } from '../utils/PropTypes';
import Label from '../components/Label';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'gray',
  },
});

const BeerDetailScreen = ({ onBack, beer }) => (
  <View style={styles.container}>
    <View style={{ alignSelf: 'stretch' }}>
      <BackArrow onPress={onBack} />
      <Label>{beer.name}</Label>
    </View>
  </View>
);

BeerDetailScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
  beer: BeerProptype.isRequired,
};

BeerDetailScreen.defaultProps = {

};

export default BeerDetailScreen;
