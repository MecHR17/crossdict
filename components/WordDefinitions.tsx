import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordDefinitions = ({ word, definitions }:any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.word}>{word}</Text>
      {definitions.map((definition:any, index:any) => (
        <View key={index} style={styles.definitionContainer}>
          <Text style={styles.definition}>{definition}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  definitionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  definition: {
    fontSize: 16,
    color: '#666',
  },
});

export default WordDefinitions;
