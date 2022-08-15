import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { manager } from '../ble';
import { useSelector } from 'react-redux';

const BLETable = () => {
    const deviceList = useSelector((state) => state.deviceList);
    const allUsers = useSelector((state) => state.keys)
    const colors = [
        '#D9E3DA',
        '#D1CFC0',
        '#C2C2B4',
        '#ECC9C7',
    ]
    const interval = useRef(0);
    // const [deviceList, setDeviceList] = useState([
    //     {name: "Oliver's iPhone", id: 0, pressed: false}, {name: "Adam's iPad", id: 1, pressed: false}
    // ]);
    const navigation = useNavigation();

    async function scanBLE() {
        manager.startDeviceScan(null, null, (e,d) => {
            if(d && d.localName && !deviceList.map(x => x.name).includes(d.localName)){
                // setDeviceList((prevState) => [...prevState, {name: d.localName, id: prevState.length, pressed: false}])
            }
            console.log('Running')
        })
    }
 
    const generateName = (x) => {
        return(
        <TouchableOpacity style={{flex: 1, width: '100%', 
                            backgroundColor: x.item.pressed ? '#85A98F' : 'white', 
                            height: 50, 
                            borderRadius: 15, 
                            justifyContent: 'center', 
                            padding: 10,
                            borderColor: 'black',
                            borderWidth: 2}}
                            onPress={() => 
                                {
                                    console.log(x.item.id);
                                    temp = deviceList.slice();
                                    temp[x.item.id].pressed = !x.item.pressed
                                }}>
            <Text 
            style={{fontFamily: 'Helvetica-Light'}}
            >
                {x.item.local_name}
            </Text>
        </TouchableOpacity>
        )
    }

    useEffect(() => {
        console.log('users', allUsers)
    })

  return (
    <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity onPress={() => {
            clearInterval(interval.current);
            manager.stopDeviceScan();
            navigation.goBack();
            }}
            style={{padding: 10}}>
            <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <View style={[styles.container, {width: '100%'}]}>
            <View style={{paddingBottom: 10, }}>
                <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 20}}> Devices Around Me</Text>
            </View>
            <FlatList
                style={{width: '100%', padding: 10}}
                data={deviceList}
                renderItem={generateName}
                ItemSeparatorComponent={() => (<View style={{height: 10}}></View>)}
                keyExtractor={(item) => item.id}
            />
            <View style={{padding: 10, }}>
                <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 20}}> BLE Meet Users </Text>
            </View>
            <FlatList
                style={{width: '100%', padding: 10}}
                data={deviceList.filter((d) =>  allUsers.includes(d.local_name))}
                renderItem={generateName}
                ItemSeparatorComponent={() => (<View style={{height: 10}}></View>)}
                keyExtractor={(item) => item.id}
            />
            {/* {deviceList && deviceList.map((x, index) => 
                <View style={{flex: 1}}>
                    <Text 
                    style={{fontFamily: 'Helvetica-Light'}} key={index}
                    >
                        {x}
                    </Text>
                </View>
            )} */}
            <TouchableOpacity style={{backgroundColor: '#03577A', width: '50%', height: '5%', borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontFamily: 'Helvetica-Bold',}}>Send</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default BLETable

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})