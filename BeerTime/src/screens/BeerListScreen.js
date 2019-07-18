import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
} from 'react-native';

import Card from '../components/Card';


const BeerListScreen = ({
  onMounted, refreshing, beers, page,
}) => {
  useEffect(() => { onMounted(); }, []);

  return (
    <FlatList
      style={{ flex: 1, alignSelf: 'stretch', backgroundColor: 'gray' }}
      refreshing={refreshing}
      onRefresh={onMounted}
      data={beers}
      onEndReached={() => onMounted(page)}
      keyExtractor={({ id }) => `${id}`}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <Card beer={item} />}
    />
  );
};

BeerListScreen.propTypes = {
  onMounted: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  beers: PropTypes.arrayOf(PropTypes.shape({})),
  page: PropTypes.number,
};

BeerListScreen.defaultProps = {
  refreshing: false,
  beers: [],
  page: 1,
};

export default BeerListScreen;
