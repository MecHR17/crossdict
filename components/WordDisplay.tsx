import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordDisplay = ({ word }:{word:string}) => {
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
      marginVertical: 5,
      width:300
    },
    container: {
      backgroundColor: '#E0E0E0', // Light grey background
      shadowColor: '#B0B0B0', // Lighter shadow color
      borderColor: '#B0B0B0', // Light grey border
      padding: 15,
      borderRadius: 8,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
      borderWidth: 1,
      width:"100%",
    },
    word: {
      fontSize: 26,
      fontWeight: '500', // Medium weight for a softer appearance
      color: '#333333', // Dark grey text color
      textAlign: 'center',
      letterSpacing: 0.5,
    },
  });
  
  export default WordDisplay;
  