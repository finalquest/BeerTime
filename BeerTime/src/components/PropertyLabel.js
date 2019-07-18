import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { StylePropType } from '../utils/PropTypes';
import Label from './Label';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: '400',
    textAlign: 'center',
    marginRight: 3,
  },
  value: {
    textAlign: 'center',
    flexShrink: 1,
  },
});

const PropertyLabel = ({
  style, name, value, separator, fontSize, nameStyles,
  valueStyles, Component, ellipsizeMode, numberOfLines,
}) => (
  <View style={[style, styles.container]}>
    <Label
      style={[nameStyles, { fontSize }]}
    >
      {`${name}${separator}`}
    </Label>
    <Component
      style={[valueStyles, { fontSize }]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {value}
    </Component>
  </View>
);
PropertyLabel.propTypes = {
  style: StylePropType,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  separator: PropTypes.string,
  fontSize: PropTypes.number,
  nameStyles: StylePropType,
  valueStyles: StylePropType,
  Component: PropTypes.func,
  ellipsizeMode: PropTypes.string,
  numberOfLines: PropTypes.number,
};
PropertyLabel.defaultProps = {
  style: {},
  separator: '',
  fontSize: 14,
  nameStyles: styles.name,
  valueStyles: styles.value,
  Component: Label,
  ellipsizeMode: 'tail',
  numberOfLines: 1,
};

export default PropertyLabel;
