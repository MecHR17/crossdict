import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { firebase_auth } from '@/constants/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/context/authContext';
import LoadingComponent from '@/components/LoadingComponent';

const login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setloading] = useState(false);
    
    const {login,register} = useAuth();

    const handleLogin = async () => {
        // Handle login logic here
        setloading(true);
        login(email,password).then(()=>{setloading(false)});
    };
    
    const handleRegister = async () => {
        setloading(true);
        register(email,password).then(()=>{setloading(false)});;
    };
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        {loading ? <LoadingComponent></LoadingComponent> : 
        <>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </>
        }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 24,
    },
    input: {
      width: '100%',
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    button: {
      width: '100%',
      padding: 12,
      backgroundColor: '#007BFF',
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 12,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    registerButton: {
      backgroundColor: '#28A745',
    },
  });

export default login