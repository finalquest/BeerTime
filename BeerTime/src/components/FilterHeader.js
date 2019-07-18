import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import PropertyLabel from './PropertyLabel';


const styles = StyleSheet.create({
  container: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
});


const FilterHeader = ({ amount }) => (
  <View style={styles.container}>
    <PropertyLabel
      name="Total beers"
      style={{ flex: 1, alignItems: 'center' }}
      nameStyles={{ fontWeight: '600' }}
      value={amount.toString()}
      separator=":"
    />
  </View>
);
FilterHeader.propTypes = {
  amount: PropTypes.number,
};
FilterHeader.defaultProps = {
  amount: 0,
};

export default FilterHeader;
