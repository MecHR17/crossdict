import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordDisplay = ({ word }:any) => {
    return (
    <Link href={{pathname:"/(app)/oneWord",params:{word:word}}} style={styles.link}>
        <View style={styles.container}>
        <Text style={styles.word}>{word}</Text>
        </View>
    </Link>

    );
  };
  
  const styles = StyleSheet.create({
    link: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    container: {
      padding: 15,
      backgroundColor: '#E0E0E0', // Light grey background
      borderRadius: 8,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#B0B0B0', // Lighter shadow color
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
      borderWidth: 1,
      borderColor: '#B0B0B0', // Light grey border
      width: '80%',
      alignSelf: 'center',
    },
    word: {
      fontSize: 28,
      fontWeight: '500', // Medium weight for a softer appearance
      color: '#333333', // Dark grey text color
      textAlign: 'center',
      letterSpacing: 0.5,
    },
  });
  
  export default WordDisplay;
  