import { take, cancel, fork, takeLatest, cancelled, takeEvery, put, call } from 'redux-saga/effects'
import { deviceListSaga } from './handlers/deviceList'
import { getDeviceList, setDeviceList, stopDeviceListen } from '../ducks/DeviceList'
import { loginUser, logoutUser, registerUser, setUser } from '../ducks/User'
import { getUserData, signUpUser} from './requests/user';
import getUserCredit from './handlers/user';
import fetchKeyInfo, { listenUpdatesToUsers } from './handlers/keys';
import { closeKeyChannel } from '../ducks/Keys';

function* loginTasks() {
  while ( yield take(getDeviceList.type) ) {
    // starts the task in the background
    const bgSyncTask = yield fork(deviceListSaga)
    const listenForUserUpdates = yield fork(listenUpdatesToUsers)
    // wait for the user stop action
    yield take(stopDeviceListen.type)
    yield cancel(bgSyncTask)

    yield take(closeKeyChannel.type)
    yield cancel(listenForUserUpdates)
    yield put(logoutUser({}))
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
  }
}

export function* watcherSaga() {
  yield fork(loginTasks);
  yield fork(getUserCredit);
  yield fork(fetchKeyInfo);
}