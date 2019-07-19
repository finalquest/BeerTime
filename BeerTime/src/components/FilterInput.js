import React from 'react';


import {
  View,
  StyleSheet,
} from 'react-native';

import Label from './Label';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white' },
});

const FilterInput = () => (
  <View style={styles.container}>
    <Label>
    Testing
    </Label>
  </View>
);

FilterInput.propTypes = {

};

FilterInput.defaultProps = {

};

export default FilterInput;
