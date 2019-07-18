import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  FlatList,
} from 'react-native';

const BeerListScreen = ({ onMounted, refreshing, beers }) => {
  useEffect(() => { onMounted(); }, []);

  return (
    <FlatList
      style={{ flex: 1, alignSelf: 'stretch', backgroundColor: 'blue' }}
      refreshing={refreshing}
      onRefresh={onMounted}
      data={beers}
      renderItem={() => <View style={{ height: 80, alignSelf: 'stretch', backgroundColor: 'white' }} />}
    />
  );
};

BeerListScreen.propTypes = {
  onMounted: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  beers: PropTypes.arrayOf(PropTypes.shape({})),
};

BeerListScreen.defaultProps = {
  refreshing: false,
  beers: [],
};

export default BeerListScreen;
