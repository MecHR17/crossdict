import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Single_Definition from '@/classes/Single_Definition';
import SingleDef from './SingleDef';
import { ScrollView } from 'react-native-gesture-handler';

const WordDefinitions = ({ word, definitions }:{word:string,definitions:Single_Definition[]|null}) => {
  const [showMore,setShowMore] = useState(false);
  const default_len = 2;
  const lst_len = definitions == null ? 0 : definitions.length;

  if(definitions == null){
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.word}>{word}</Text>
      <SingleDef definition='No definitions found' partOfSpeech=''></SingleDef>
    </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.word}>{word}</Text>
      {definitions?.slice(0,showMore ? lst_len : default_len)?.map((definition:Single_Definition, index:any) => (
        <SingleDef key={index} definition={definition.def} partOfSpeech={definition.part}></SingleDef>
      ))}
      { ( lst_len > 2) ? 
      <TouchableOpacity onPress={() => setShowMore(!showMore)}>
        <Text style={styles.toggleText}>
          {showMore ? 'Show Less' : 'Show More'}
        </Text>
      </TouchableOpacity>: <></> }
    </ScrollView>
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
  toggleText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default WordDefinitions;
