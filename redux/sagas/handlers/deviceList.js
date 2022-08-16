import { take, put, call, cancelled } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { setDeviceList } from "../../ducks/DeviceList";
import { manager } from '../../../ble'

function scanBLE() {
    return eventChannel(emitter => {
        // const manager = new BlesManager();
        manager.startDeviceScan(null, null, (e,d) => {
            if(d && d.localName){
                emitter(d)
            }
        })
        return () => {
            manager.stopDeviceScan()
        }
    })
}

export function* deviceListSaga() {
    const chan = yield call(scanBLE)
    try {    
        while (true) {
            // take(END) will cause the saga to terminate by jumping to the finally block
            let d = yield take(chan)
            const data = {
                localName : d.localName,
                id : d.id
            }
            yield put(setDeviceList(data))

        }
    } finally {
        if (yield cancelled()){
            chan.close()
        }
    }
}