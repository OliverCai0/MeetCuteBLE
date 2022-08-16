import { Image, ImageBackground, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { authentication } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import Profile from './Profile'
import * as Linking from 'expo-linking';
import * as Device from 'expo-device';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import { useEffect } from 'react'
import { manager } from '../ble'
import { useDispatch, useSelector } from 'react-redux';
import { getDeviceList, setDeviceList, stopDeviceListen } from '../redux/ducks/DeviceList'
import { loginUser, resetUserData, setUser } from '../redux/ducks/User'
import { useNetInfo } from '@react-native-community/netinfo'
import { storage } from '../mmkv'
import fetchKeyInfo from '../redux/sagas/handlers/keys'
import { closeKeyChannel, getKeys } from '../redux/ducks/Keys'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const netinfo = useNetInfo();
  const navgiation = useNavigation();
  const user = useSelector((state) => state.user);
  const keys = useSelector((state) => state.keys);
  const [nameString, setNameString] = useState('');

  const goToBLETable = () => {
    navgiation.navigate("BLE");
  }

  const goToAboutSettings = () => {
    if(Device.osName != 'Android'){
        Linking.openURL('App-prefs:root=General&path=About');
    }
    else{
        Linking.openSettings();
    }
  }
  const handleSignOut = () => {
    signOut(authentication).then(() => {
        dispatch(stopDeviceListen({}))
        dispatch(closeKeyChannel({}))
        navgiation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  useEffect(() => {
    dispatch(getDeviceList())
    if(keys.length == 0){
      dispatch(getKeys())
    }

    if (Object.keys(user) == 0){
      if (netinfo.isConnected){
        dispatch(loginUser({id : authentication.currentUser.uid}))
      }
      else{
        dispatch(resetUserData())
      }
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {width: '90%'}]}>
        {/* <ImageBackground 
          resizeMode='cover'
          imageStyle={{ borderRadius: 15,borderColor: 'black',
          borderWidth: 2,}}
          style={{width: '100%', 
                  flex: 1, 
                  alignItems: 'center', 
                  justifyContent: 'center',
                   }} 
            source={require('../assets/background1.jpg')}
            > */}
        <Text style={{fontSize: 50, fontFamily: 'HelveticaNeue-Bold', color: 'black'}}>Welcome</Text>
        <Text style={{fontSize: 50, fontFamily: 'HelveticaNeue-Bold', color: 'black'}}>Back!</Text>
        {/* </ImageBackground> */}
        <View style={{flex: 4, width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
        <KeyboardAvoidingView style={[styles.container, {width: '100%'}]}>
          <View style={[ {backgroundColor: '#CBF3F9', width: '90%', height: '25%', borderRadius: 15, justifyContent: 'center', padding: 10, borderColor: 'black', borderWidth: 2}]}>
            <Text style={{color: 'black', fontFamily: 'Helvetica-Bold',}}>{user.username}</Text>
          </View>
          <View style={{height: 10}}></View>
          <View style={[ {backgroundColor: '#CBF3F9', width: '90%', height: '25%', borderRadius: 15, justifyContent: 'center', padding: 10, borderColor: 'black', borderWidth: 2}]}>
            <Text style={{color: 'black', fontFamily: 'Helvetica-Bold',}}>BLE Identifier: {user.uuid}</Text>
          </View>
          <TouchableOpacity style={[ {backgroundColor: '#CBF3F9', width: '90%', height: '25%', borderRadius: 15, justifyContent: 'center', padding: 10, borderColor: 'black', borderWidth: 2}]}>
            <Text style={{color: 'black', fontFamily: 'Helvetica-Bold',}}>BLE Identifier: {user.uuid}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </View>
        <View style={{flex: 1}}>
        </View>
      </View>
      <View style={[styles.container, {flexDirection: 'row', justifyContent: 'space-evenly', width: '100%',flex: 0, height: '30%'}]}>
        <TouchableOpacity style={{alignItems: 'center', 
                                  justifyContent: 'center', 
                                  backgroundColor: '#ADD8E6', 
                                  width: '40%', borderRadius: 15, aspectRatio: 1, borderColor: 'black', borderWidth: 2}}
                          onPress={() => goToBLETable()}>
          <View style={{backgroundColor: 'white', borderRadius: 15, width: '50%', alignItems: 'center', aspectRatio: 1, justifyContent: 'center'}}>
            <FontAwesome name="bluetooth" size={50} color='#ADD8E6' />
          </View>
          <Text style={{color: 'black', fontFamily: 'Helvetica-Light', padding: 20}}>Find People</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFD580', width: '40%', borderRadius: 15, aspectRatio: 1, borderColor: 'black', borderWidth: 2}}>
          <View style={{backgroundColor: 'white', borderRadius: 15, width: '50%', alignItems: 'center', aspectRatio: 1, justifyContent: 'center'}}>
          <Ionicons name="chatbubble" size={50} color='#FFD580' />
          </View>
          <Text style={{color: 'black', fontFamily: 'Helvetica-Light', padding: 20}}>Chat with Friends</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
      onPress={() => handleSignOut()}
      style={{backgroundColor: '#BD5A54', width: '50%', height: '7%', borderRadius: 15, borderColor: 'black', borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontFamily: 'Helvetica-Light'}}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
    // <View style={styles.container}>
    //   <Profile></Profile>
    //   <Text>{Device.deviceName}</Text>
    //   <Text>Change to: {nameString}</Text>
    //   <View style={styles.textInputWrapper}>
    //   <TextInput
    //     style={styles.input}
    //     onChangeText={(text) => setNameString(text)}
    //   />
    //   </View>
    //   <TouchableOpacity 
    //     onPress={() => goToAboutSettings()}
    //     style={styles.button}>
    //     <Text>Go to Settings</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => handleSignOut()}
    //                     style={styles.button}>
    //     <Text>Signout</Text>
    //   </TouchableOpacity>
    // </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    textInputWrapper:{
        width: '80%',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
})