import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import { BeerProptype } from '../utils/PropTypes';
import Label from './Label';
import PropertyLabel from './PropertyLabel';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
  },
  imageContainer: {
    flex: 0.2,
    marginLeft: 5,
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  name: {
    fontSize: 25, textAlign: 'center',
  },
});


const Card = ({ beer, onItemSelected }) => {
  const {
    image_url: imageUrl, name, tagline, first_brewed: firstBrewed,
  } = beer;
  return (
    <TouchableOpacity style={styles.container} onPress={() => onItemSelected()}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Label style={styles.name} ellipsizeMode="tail" numberOfLines={2}>{name}</Label>
        <Label style={{ fontSize: 11 }}>{tagline}</Label>
        <PropertyLabel
          name="First brew date"
          style={{ marginVertical: 10 }}
          value={firstBrewed}
          separator=":"
        />
      </View>
    </TouchableOpacity>
  );
};
Card.propTypes = {
  beer: BeerProptype.isRequired,
  onItemSelected: PropTypes.func.isRequired,
};
Card.defaultProps = {
};

export default Card;
