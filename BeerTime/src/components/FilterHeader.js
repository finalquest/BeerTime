import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import PropertyLabel from './PropertyLabel';

import Empty from '../../res/emptyBox.png';


const styles = StyleSheet.create({
  container: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
    margin: 10,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});


const FilterHeader = ({ amount, onFilterPressed }) => (
  <View style={styles.container}>
    <PropertyLabel
      name="Total beers"
      style={{ flex: 1, alignItems: 'center' }}
      nameStyles={{ fontWeight: '600', marginLeft: 10 }}
      value={amount.toString()}
      separator=":"
    />
    <TouchableOpacity onPress={onFilterPressed}>
      <Image source={Empty} style={styles.icon} />
    </TouchableOpacity>
  </View>
);
FilterHeader.propTypes = {
  amount: PropTypes.number,
  onFilterPressed: PropTypes.func.isRequired,
};
FilterHeader.defaultProps = {
  amount: 0,
};

export default FilterHeader;
