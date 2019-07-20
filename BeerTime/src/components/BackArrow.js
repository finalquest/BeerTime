import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StylePropType } from '../utils/PropTypes';

const closeIcon = require('../../res/back.png');

const styles = StyleSheet.create({
  close: {
    alignSelf: 'center',
    tintColor: 'black',
  },
  closeContainer: {
    height: 40,
    width: 45,
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'white',
  },
});

const BackArrow = ({ onPress, styleImage }) => (
  <TouchableOpacity style={styles.closeContainer} onPress={onPress}>
    <Image source={closeIcon} style={[styles.close, styleImage]} />
  </TouchableOpacity>
);
BackArrow.propTypes = {
  onPress: PropTypes.func.isRequired,
  styleImage: StylePropType,
};
BackArrow.defaultProps = {
  styleImage: styles.close,
};


export default BackArrow;
