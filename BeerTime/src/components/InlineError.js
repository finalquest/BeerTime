import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Label from './Label';
import { StylePropType } from '../utils/PropTypes';

const styles = StyleSheet.create({
  error: {
    fontSize: 11,
    color: 'red',
  },
});

const InlineError = ({ error, style }) => (error !== '' ? <Label style={[styles.error, style]}>{error}</Label> : null);

InlineError.propTypes = {
  error: PropTypes.string.isRequired,
  style: StylePropType,
};

InlineError.defaultProps = {
  style: {},
};

export default InlineError;
