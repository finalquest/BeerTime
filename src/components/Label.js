import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions, Text, StyleSheet, Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

class Label extends React.PureComponent {
  render() {
    const {
      style, children, uppercase, ...props
    } = this.props;

    const flattenStyle = StyleSheet.flatten(style);
    const currentFontSize = flattenStyle.fontSize || 14;
    const fontSize = Platform.OS === 'android' ? Math.ceil((currentFontSize / 12) * (width / 30)) : Math.ceil((currentFontSize / 12) * (width / 26.67));

    return (
      <Text
        style={[
          style,
          {
            fontSize,
            // lineHeight: scaledLineHeight,
          }]}
        allowFontScaling={false}
        {...props}
      >
        {uppercase ? children.toUpperCase() : children}
      </Text>
    );
  }
}

Label.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  uppercase: PropTypes.bool,
  numberOfLines: PropTypes.number,
  ellipsizeMode: PropTypes.string,
};

Label.defaultProps = {
  style: {},
  uppercase: false,
  numberOfLines: undefined,
  ellipsizeMode: 'tail',
};

export default Label;
