import { KeyboardAvoidingView, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { authentication } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error ,setError] = useState(null);
  const [register, setRegister] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("Home")
        }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    setLoading(true);
    if (username){
      createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
          // Signed in 
          setDoc(doc(firestore, 'users', userCredential.user.email), {
            username: username,
            bleID: Math.random().toString().slice(2,15)
          }).then(() => {
              const user = userCredential.user;
              console.log(userCredential);
            })
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log(errorCode);
          console.log(errorMessage);
        });
        setLoading(false);
    }
    else{
      console.log('no username provided')
      setError('No username provided');
    }
  }

    const handleLogin = () => {
        setLoading(true);
        signInWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
            // Logged in 
            const user = userCredential.user;
            console.log(userCredential);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error Code',errorCode);
            console.log('Error Message', errorMessage);
            setError(errorMessage);
          });
          setLoading(false);
    }
  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={[styles.container, 
                  {width: '90%', 
                  flexDirection: 'row', 
                  justifyContent: 'space-evenly',
                  flex: 2,
                  }]}>
      <Text style={{fontSize: 50, fontFamily: 'HelveticaNeue-Bold'}}> Sign Up</Text>
        <Image 
            source={require('../assets/bluetooth.png')}
            style={{width: '25%', resizeMode: 'contain'}}/>
      </View>
    <KeyboardAvoidingView
        style={[styles.container, {flex: 3, width: '90%'}]}
        behavior='padding'>
        <View style={[styles.container, 
                    {width: '80%', flex: 4, justifyContent: 'space-evenly'}]}>
            {register && <TextInput
            placeholder='Username'
            value ={username}
            onChangeText={text=> setUsername(text)}
            style={[styles.textInputFields, {borderWidth: (username && 2) || 0}]}
            />}
            <TextInput
            placeholder='Email'
            value ={email}
            onChangeText={text=> setEmail(text)}
            style={[styles.textInputFields, {borderWidth: (email && 2) || 0}]}
            />
            <TextInput
            placeholder='Password'
            value ={password}
            onChangeText={text=> setPassword(text)}
            style={[styles.textInputFields, {borderWidth: (password && 2) || 0}]}
            secureTextEntry
            />
        </View>
        {error && 
          <Text style={{color: 'red', fontFamily: 'Helvetica-Light'}}>{error}</Text>
        }
      </KeyboardAvoidingView>
      <View style={{flex: 2, justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}}>
        <View style={[styles.container, {width: '80%'}]}>
            <Text style={{fontFamily: 'Helvetica-Light'}}>Creating an account means you are okay with our Terms of Service
              and Privacy Policy
            </Text>
          </View>
          <View style={[styles.container, {width: '80%', justifyContent: 'flex-start'}]}>
              {loading && <ActivityIndicator size="large"/>}
              {register && !loading && <TouchableOpacity onPress={handleSignUp}
                                style={styles.button}>
                  <Text style={{fontFamily: 'Helvetica'}}>Create an Account</Text>
              </TouchableOpacity>}
              {!register && !loading && <TouchableOpacity onPress={handleLogin}
                                style={styles.button}>
                  <Text style={{fontFamily: 'Helvetica'}}>Login</Text>
              </TouchableOpacity>}
          </View>
          <View style={[styles.container, {width: '80%', justifyContent: 'flex-start'}]}>
              {register && <TouchableOpacity onPress={() => {setRegister(false);
                                                             setError(null);}}
                                style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Helvetica-Light'}}>Already have an account?</Text>
                  <Text style={{fontFamily: 'Helvetica-Light', color: 'blue'}}> Sign in.</Text>
              </TouchableOpacity>}
              {!register && <TouchableOpacity onPress={() => {setRegister(true);
                                                              setError(null);}}
                                style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Helvetica-Light'}}>New? </Text>
                  <Text style={{fontFamily: 'Helvetica-Light', color: 'blue'}}> Create an account</Text>
              </TouchableOpacity>}
          </View>
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
    textInputFields: {
      width: '100%', 
      borderColor: 'blue', 
      height: '20%', 
      backgroundColor: 'white', 
      borderRadius: 10, 
      padding:10, 
    },
})