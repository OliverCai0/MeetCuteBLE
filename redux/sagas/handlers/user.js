import { call, takeLatest, all, put } from "redux-saga/effects"
import { storage } from "../../../mmkv"
import { setUser, registerUser, loginUser, setAllUsers, resetUserData } from "../../ducks/User"
import { signUpUser, getUserData, grabAllUsers } from "../requests/user"

function* loginGetData(action) {
    try{
      // const response = JSON.parse(storage.getString('user'))
      const response = yield call(getUserData, action)
      console.log("Login response: ", response);
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
        console.log("Register Data response: ", response);
        yield put(setUser(response))
    } catch(error) {
        console.log("registerData error:", error)
    }
} 

  
export default function* getUserCredit(){
    yield all([
        takeLatest(registerUser.type, registerData),
        takeLatest(loginUser.type, loginGetData),
        takeLatest(resetUserData.type, findUser)
    ])
}