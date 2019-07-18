import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
} from 'react-native';

import Card from '../components/Card';


const BeerListScreen = ({ onMounted, refreshing, beers }) => {
  useEffect(() => { onMounted(); }, []);

  return (
    <FlatList
      style={{ flex: 1, alignSelf: 'stretch', backgroundColor: 'gray' }}
      refreshing={refreshing}
      onRefresh={onMounted}
      data={beers}
      keyExtractor={({ id }) => `${id}`}
      renderItem={({ item }) => <Card beer={item} />}
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
