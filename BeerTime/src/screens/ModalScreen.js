import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { ChildPropType } from '../utils/PropTypes';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

const ModalScreen = ({ show, children }) => (
  <Modal
    animationType="fade"
    transparent
    visible={show}
  >
    <View style={styles.container}>
      {children}
    </View>
  </Modal>
);

ModalScreen.propTypes = {
  show: PropTypes.bool,
  children: ChildPropType.isRequired,
};
ModalScreen.defaultProps = {
  show: false,
};

export default ModalScreen;
