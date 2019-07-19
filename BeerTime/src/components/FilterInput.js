import React, { useState } from 'react';


import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import TextInput from './TextInput';
import Label from './Label';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    marginHorizontal: 20,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    color: 'dimgrey',
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '400',
    marginBottom: 20,
  },
  primary: {
    flex: 1,
    backgroundColor: '#4169ff',
    height: 45,
    alignSelf: 'stretch',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  secondary: {
    backgroundColor: 'white',
    borderColor: '#4169ff',
    borderWidth: 1,
  },
  textSecondary: {
    color: '#4169ff',
    fontSize: 18,
  },
});

const FilterInput = ({ onFilterSelected, onFilterCancel }) => {
  const [inputValue, setInputValue] = useState(undefined);
  const [fromBrewDate, setFromBrewDate] = useState({ value: '' });
  const [toBrewDate, setToBrewDate] = useState({ value: '' });

  const validateInput = () => {
    const datePattern = /[\d]{2}-[\d]{4}$/;
    const { value: toBrewDateValue } = toBrewDate;
    const { value: fromBrewDateValue } = fromBrewDate;

    let error = false;

    if (toBrewDateValue !== '' && !datePattern.test(toBrewDateValue)) {
      setToBrewDate({ value: toBrewDateValue, error: 'Invalid format. Should be MM-YYYY' });
      error = true;
    }
    if (fromBrewDateValue !== '' && !datePattern.test(fromBrewDateValue)) {
      setFromBrewDate({ value: fromBrewDateValue, error: 'Invalid format. Should be MM-YYYY' });
      error = true;
    }

    if (!error) {
      onFilterSelected({
        name: inputValue,
        fromBrewDate: fromBrewDateValue,
        toBrewDate: toBrewDateValue,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Label style={styles.title}>Search</Label>
      <TextInput
        label="Beer Name"
        style={styles.input}
        labelStyle={styles.inputLabel}
        value={inputValue}
        onChange={(text) => {
          setInputValue(text);
        }}
      />
      <TextInput
        label="After First Brew Date"
        style={styles.input}
        labelStyle={styles.inputLabel}
        value={fromBrewDate.value}
        error={fromBrewDate.error}
        onChange={(text) => {
          setFromBrewDate({ value: text });
        }}
      />
      <TextInput
        label="Before First Brew Date"
        style={styles.input}
        labelStyle={styles.inputLabel}
        value={toBrewDate.value}
        error={toBrewDate.error}
        onChange={(text) => {
          setToBrewDate({ value: text });
        }}
      />
      <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
        <TouchableOpacity
          style={styles.primary}
          onPress={() => {
            validateInput();
            // onFilterSelected({ name: inputValue, fromBrewDate });
          }}
        >
          <Label style={styles.text}>OK</Label>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primary, styles.secondary]}
          onPress={() => {
            onFilterCancel();
          }}
        >
          <Label style={[styles.text, styles.textSecondary]}>Cancel</Label>
        </TouchableOpacity>
      </View>
    </View>
  );
};

FilterInput.propTypes = {
  onFilterSelected: PropTypes.func.isRequired,
  onFilterCancel: PropTypes.func.isRequired,
};

FilterInput.defaultProps = {
};

export default FilterInput;
