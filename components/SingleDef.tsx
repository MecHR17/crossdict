import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleDef = ({ definition, partOfSpeech }:{definition:string,partOfSpeech:string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.definition}>{definition}</Text>
      <Text style={styles.partOfSpeech}>{partOfSpeech}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  definition: {
    fontSize: 16,
    marginBottom: 8,
  },
  partOfSpeech: {
    fontSize: 12,
    color: '#888', // faint color
    position: 'absolute',
    top: 0,
    right: 0,
    paddingRight: 8,
    paddingTop: 4,
  },
});

export default SingleDef;
