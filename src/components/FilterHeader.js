import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import PropertyLabel from './PropertyLabel';

import Box from '../../res/emptyBox.png';
import Empty from '../../res/starEmpty.png';
import Star from '../../res/star.png';


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


const FilterHeader = ({
  amount, onFilterPressed, onFavPressed, showFav,
}) => {
  const Source = showFav ? Star : Empty;
  return (
    <View style={styles.container}>
      <PropertyLabel
        name="Total beers"
        style={{ flex: 1, alignItems: 'center' }}
        nameStyles={{ fontWeight: '600', marginLeft: 10 }}
        value={amount.toString()}
        separator=":"
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onFavPressed}>
          <Image source={Source} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFilterPressed}>
          <Image source={Box} style={styles.icon} />
        </TouchableOpacity>
      </View>

    </View>
  );
};
FilterHeader.propTypes = {
  amount: PropTypes.number,
  onFilterPressed: PropTypes.func.isRequired,
  onFavPressed: PropTypes.func.isRequired,
  showFav: PropTypes.bool.isRequired,
};
FilterHeader.defaultProps = {
  amount: 0,
};

export default FilterHeader;
