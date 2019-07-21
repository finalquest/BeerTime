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

import Empty from '../../res/starEmpty.png';
import Star from '../../res/star.png';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
    borderColor: 'lightgray',
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
  },
  name: {
    fontSize: 20, textAlign: 'left',
  },
  icon: {
    alignSelf: 'center',
    margin: 10,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});


const Card = ({ beer, onItemSelected, addToFavs }) => {
  const {
    image_url: imageUrl, name,
    tagline, first_brewed: firstBrewed, id, selected,
  } = beer;
  const imageSource = selected ? Star : Empty;
  return (
    <TouchableOpacity style={styles.container} onPress={() => onItemSelected(beer)}>
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
      <TouchableOpacity onPress={() => { addToFavs(id); }}>
        <Image source={imageSource} style={styles.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
Card.propTypes = {
  beer: BeerProptype.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  addToFavs: PropTypes.func.isRequired,
};
Card.defaultProps = {
};

export default Card;
