import React from 'react';
import {
  View,
  TextInput as RNTextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import Label from './Label';
import { StylePropType } from '../utils/PropTypes';
import InlineError from './InlineError';


const TextInput = ({
  label, labelStyle, style, onChange,
  keyboardType, value, error,
}) => {
  const valueProp = value ? { value } : {};
  return (
    <View style={{ alignSelf: 'stretch' }}>
      <Label style={labelStyle}>{label}</Label>
      <RNTextInput
        autoCorrect={false}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        onChangeText={(text) => { onChange(text); }}
        style={[style]}
        {...valueProp}
      />
      <InlineError error={error} />
    </View>
  );
};
TextInput.propTypes = {
  style: StylePropType,
  labelStyle: StylePropType,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};
TextInput.defaultProps = {
  style: undefined,
  labelStyle: undefined,
  keyboardType: 'default',
  value: undefined,
  error: '',
};

export default TextInput;
