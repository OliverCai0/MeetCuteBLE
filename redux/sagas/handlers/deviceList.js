import { take, put, call, cancelled } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { setDeviceList } from "../../ducks/DeviceList";
import { BleManager } from 'react-native-ble-plx';
import { manager } from '../../../ble'

function scanBLE() {
    return eventChannel(emitter => {
        // const manager = new BlesManager();
        manager.startDeviceScan(null, null, (e,d) => {
            if(d && d.localName){
                console.log("Emitter" , d.localName)
                emitter(d)
            }
        })
        return () => {
            console.log('Stop')
            manager.stopDeviceScan()
        }
    })
}

export function* deviceListSaga() {
    const chan = yield call(scanBLE)
    console.log('started')
    try {    
        while (true) {
            // take(END) will cause the saga to terminate by jumping to the finally block
            // console.log('entered Block')
            let d = yield take(chan)
            console.log("name: ", d.localName)
            const data = {
                localName : d.localName,
                id : d.id
            }
            yield put(setDeviceList(data))

        }
    } finally {
        if (yield cancelled()){
            chan.close()
            console.log('terminated')
        }
    }
}