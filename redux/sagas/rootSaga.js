import { take, cancel, fork, takeLatest, cancelled, takeEvery } from 'redux-saga/effects'
import { deviceListSaga } from './handlers/deviceList'
import { getDeviceList, setDeviceList } from '../ducks/DeviceList'

function* loginTasks() {
  while ( yield take(getDeviceList.type) ) {
    // starts the task in the background
    // const bgSyncTask = yield fork(deviceListSaga)

    // wait for the user stop action
    yield take('STOP_BACKGROUND_SYNC')
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
  }
}

export function* watcherSaga() {
  yield fork(loginTasks)
}