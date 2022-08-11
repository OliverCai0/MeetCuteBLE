import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { manager } from '../ble';


const BLETable = () => {
    const navigation = useNavigation();

    async function scanBLE() {
        manager.startDeviceScan(null, null, async (e, d) => {
            console.log('Device', d);
            console.log('Error', e);
        })
    }

    useEffect(() => {
        scanBLE();
    }, []);

  return (
    <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text>BLE</Text>
    </SafeAreaView>
  )
}

export default BLETable

const styles = StyleSheet.create({})