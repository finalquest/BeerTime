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
  container: { flex: 1, alignSelf: 'stretch', backgroundColor: 'white' },
});

const BeerListScreen = ({
  onMounted, onEndReached, endReached, refreshing,
  beers, page, name, toBrewDate,
  fromBrewDate, applyFilter, onItemSelected, addToFavs, toggleFavs,
  showFavs,
}) => {
  useEffect(() => { onMounted(); }, []);
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const antiBounce = (currentPage, beerName) => {
    if (!disabled) {
      onEndReached(currentPage, beerName);
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 1200);
    }
  };

  return (
    <View style={styles.container}>
      <FilterHeader
        showFav={showFavs}
        amount={beers.length}
        onFilterPressed={() => {
          setShowModal(true);
        }}
        onFavPressed={toggleFavs}
      />
      <FlatList
        style={styles.container}
        refreshing={refreshing}
        onRefresh={onMounted}
        data={beers}
        onEndReached={() => {
          if (!endReached && !refreshing) {
            antiBounce(page, { name, toBrewDate, fromBrewDate });
          }
        }}
        keyExtractor={({ id }) => `${id}`}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <Card
            beer={item}
            addToFavs={addToFavs}
            onItemSelected={onItemSelected}
          />
        )}
      />
      <ModalScreen show={showModal}>
        <FilterInput
          onFilterCancel={() => {
            setShowModal(false);
          }}
          onFilterSelected={(filter) => {
            applyFilter(filter);
            setShowModal(false);
          }}
        />
      </ModalScreen>
    </View>
  );
};

BeerListScreen.propTypes = {
  onMounted: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  beers: PropTypes.arrayOf(PropTypes.shape({})),
  page: PropTypes.number,
  applyFilter: PropTypes.func.isRequired,
  name: PropTypes.string,
  onEndReached: PropTypes.func.isRequired,
  endReached: PropTypes.bool,
  fromBrewDate: PropTypes.string,
  toBrewDate: PropTypes.string,
  onItemSelected: PropTypes.func.isRequired,
  addToFavs: PropTypes.func.isRequired,
  toggleFavs: PropTypes.func.isRequired,
  showFavs: PropTypes.bool.isRequired,
};

BeerListScreen.defaultProps = {
  refreshing: false,
  beers: [],
  page: 1,
  name: undefined,
  endReached: false,
  fromBrewDate: '',
  toBrewDate: '',
};

export default BeerListScreen;
