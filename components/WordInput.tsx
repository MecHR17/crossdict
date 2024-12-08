import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const WordInput = ({ value, onChangeText, placeholder, onAdd, onRemove }:any) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    margin: 10,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#B0B0B0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    width: '100%', // Make container width 100% to ensure it adjusts to its parent
    maxWidth: 350,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  input: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333333',
    textAlign: 'center',
    letterSpacing: 0.5,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 5, // Reduced margin to fit buttons better
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: 50,
    height: 50,
    marginHorizontal: 2, // Reduced horizontal margin to fit within container
  },
  buttonText: {
    fontSize: 24, // Adjusted font size for better visibility
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 50,
  },
});

export default WordInput;
