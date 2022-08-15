import { collection, onSnapshot } from "firebase/firestore";
import { eventChannel } from "redux-saga";
import { all, takeLatest, call, put, take, cancelled } from "redux-saga/effects";
import { firestore } from "../../../firebase";
import { getKeys, setKeys } from "../../ducks/Keys";
import { grabAllUsers } from "../requests/user";

function userChannel(){
    return eventChannel(emitter => {
        const unsub = onSnapshot(collection(firestore,'users'), (query) =>{
            console.log('query from chanel', query)
            emitter(query.docs.map((doc) => doc.data()))
        })
        return () => {
            unsub()
        }
    })
}

export function* listenUpdatesToUsers() {
    const chan = yield call(userChannel)
    try{
        while(true){
            let r = yield take(chan)
            console.log('New Update: ', r.map((x) => x.uuid))
            yield put(setKeys(r.map((x) => x.uuid)))
        }
    } finally{
        if (yield(cancelled())){
            chan.close()
            console.log('terminated')
        }
    }
}

function* storeAllUserData(action) {
    try{
      const response = yield call(grabAllUsers, action)
      console.log('response for keys', response)
      yield put(setKeys(response.map((x) => x.uuid)))
    }catch(error){
      console.log("storeAllUserData error:", error)
    }
  }

export default function* fetchKeyInfo(){
    yield all([
        takeLatest(getKeys.type, storeAllUserData)
    ])
}