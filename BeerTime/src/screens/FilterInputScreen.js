import React from 'react';


import {
  View,
  StyleSheet,
} from 'react-native';

import Label from '../components/Label';

const styles = StyleSheet.create({
  container: { backgroundColor: 'white' },
});

const FilterInputScreen = () => (
  <View style={styles.container}>
    <Label>
    Testing
    </Label>
  </View>
);

FilterInputScreen.propTypes = {

};

FilterInputScreen.defaultProps = {

};

export default FilterInputScreen;
