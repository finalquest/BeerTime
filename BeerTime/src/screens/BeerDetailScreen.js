import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import BackArrow from '../components/BackArrow';
import { BeerProptype } from '../utils/PropTypes';
import Label from '../components/Label';
import PropertyLabel from '../components/PropertyLabel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontWeight: '400',
    textAlign: 'left',
    marginRight: 3,
  },
});

const BeerDetailScreen = ({
  onBack, beer: {
    name, tagline, description, abv, volume: { value, unit }, food_pairing: foodPairing,
  },
}) => (
  <View style={styles.container}>
    <View style={{ alignSelf: 'stretch' }}>
      <BackArrow onPress={onBack} />
      <View style={{ margin: 10 }}>
        <Label style={styles.title}>{name}</Label>
        <Label style={styles.subTitle}>{tagline}</Label>
        <Label style={[styles.description, { marginVertical: 5 }]}>{description}</Label>
        <PropertyLabel
          name="ABV"
          style={{ marginVertical: 5 }}
          numberOfLines={0}
          nameStyles={[styles.description, { fontWeight: '600' }]}
          valueStyles={styles.description}
          value={abv}
          separator=":"
        />
        <PropertyLabel
          name="Volume"
          style={{ marginVertical: 5 }}
          numberOfLines={0}
          nameStyles={[styles.description, { fontWeight: '600' }]}
          valueStyles={styles.description}
          value={`${value} ${unit}`}
          separator=":"
        />
        {foodPairing.length > 0 ? (
          <PropertyLabel
            name="Food Pairing"
            style={{ marginVertical: 5 }}
            numberOfLines={0}
            nameStyles={[styles.description, { fontWeight: '600' }]}
            valueStyles={styles.description}
            value={foodPairing.join('\n')}
            separator=":"
          />
        ) : undefined}
      </View>
    </View>
  </View>
);

BeerDetailScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
  beer: BeerProptype.isRequired,
};

BeerDetailScreen.defaultProps = {

};

export default BeerDetailScreen;
