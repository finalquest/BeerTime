import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'stretch', backgroundColor: 'gray' },
});

const BeerDetailScreen = () => (
  <View style={styles.container} />
);

BeerDetailScreen.propTypes = {

};

BeerDetailScreen.defaultProps = {

};

export default BeerDetailScreen;
