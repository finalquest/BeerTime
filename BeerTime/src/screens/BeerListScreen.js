import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
  View,
  StyleSheet,
} from 'react-native';

import Card from '../components/Card';
import FilterHeader from '../components/FilterHeader';
import ModalScreen from './ModalScreen';
import FilterInput from '../components/FilterInput';

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: 'stretch', backgroundColor: 'gray' },
});

const BeerListScreen = ({
  onMounted, refreshing, beers, page,
}) => {
  useEffect(() => { onMounted(); }, []);
  const [showModal, setShowModal] = useState(false);


  return (
    <View style={styles.container}>
      <FilterHeader
        amount={beers.length}
        onFilterPressed={() => {
          setShowModal(true);
        }}
      />
      <FlatList
        style={styles.container}
        refreshing={refreshing}
        onRefresh={onMounted}
        data={beers}
        onEndReached={() => onMounted(page)}
        keyExtractor={({ id }) => `${id}`}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <Card beer={item} />}
      />
      <ModalScreen show={showModal}>
        <FilterInput />
      </ModalScreen>
    </View>
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
