import { call, takeLatest, all, put } from "redux-saga/effects"
import { storage } from "../../../mmkv"
import { setUser, registerUser, loginUser, resetUserData, addUserContact } from "../../ducks/User"
import { signUpUser, getUserData, addNewContact } from "../requests/user"

function* loginGetData(action) {
    try{
      // const response = JSON.parse(storage.getString('user'))
      const response = yield call(getUserData, action)
      yield put(setUser(response))
    } catch(error) {
      console.log(error)
    } 
  }

function* findUser(action){
  try{
    yield put(setUser(JSON.parse(storage.getString('user'))))
  } catch(error){
    console.log(error)
  }
}
  
function* registerData(action) {
    try{
        const response = yield call(signUpUser, action)
        yield put(setUser(response))
    } catch(error) {
        console.log("registerData error:", error)
    }
}

function* handleNewContact(action){
  try{
    console.log('Hello')
    console.log('action', action)
    const response = yield call(addNewContact, action)
    yield put(addUserContact(action))
  }catch(error){

  }
}

  
export default function* getUserCredit(){
    yield all([
        takeLatest(registerUser.type, registerData),
        takeLatest(loginUser.type, loginGetData),
        takeLatest(resetUserData.type, findUser),
        takeLatest(addUserContact.type, handleNewContact)
    ])
}