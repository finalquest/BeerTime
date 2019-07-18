import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

const BeerListScreen = ({ onMounted }) => {
  useEffect(() => { onMounted(); }, []);
  return (
    <View style={{ alignSelf: 'stretch', flex: 1, backgroundColor: 'red' }} />
  );
};

BeerListScreen.propTypes = {
  onMounted: PropTypes.func.isRequired,
};

export default BeerListScreen;
