import React from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
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
  descriptionContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#F2FCF7',
    borderColor: '#02C66A',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 20,
    overflow: 'hidden',
  },
  volumeContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F2FCF7',
    borderColor: '#02C66A',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    overflow: 'hidden',
  },
  scrollView: {
    marginHorizontal: 10,
    flex: 1,
    alignSelf: 'stretch',
  },
});

const BeerDetailScreen = ({
  onBack, beer: {
    name, tagline, description, abv, volume: { value, unit }, food_pairing: foodPairing,
  },
}) => (
  <View style={styles.container}>
    <BackArrow onPress={onBack} />
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <Label style={styles.title}>{name}</Label>
      <Label style={styles.subTitle}>{tagline}</Label>
      <View style={styles.descriptionContainer}>
        <Label style={[styles.description, { marginVertical: 5 }]}>{description}</Label>
      </View>
      <View style={styles.volumeContainer}>
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
      </View>
      {foodPairing.length > 0 ? (
        <View style={styles.descriptionContainer}>
          <PropertyLabel
            name="Food Pairing"
            style={{ marginVertical: 5 }}
            numberOfLines={0}
            nameStyles={[styles.description, { fontWeight: '600' }]}
            valueStyles={styles.description}
            value={foodPairing.join('\n')}
            separator=":"
          />
        </View>
      ) : undefined}
    </ScrollView>
  </View>
);

BeerDetailScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
  beer: BeerProptype.isRequired,
};

BeerDetailScreen.defaultProps = {

};

export default BeerDetailScreen;
