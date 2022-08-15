import { configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./ducks/User"
import contactsReducer from "./ducks/Contacts";
import deviceListReducer from "./ducks/DeviceList";
import { watcherSaga } from "./sagas/rootSaga";
import createSagaMiddleware from "@redux-saga/core";
import blocksReducer from "./ducks/Blocks";
import keysReducer from "./ducks/Keys"

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    user: userReducer,
    contacts : contactsReducer,
    deviceList : deviceListReducer,
    blocks : blocksReducer,
    keys : keysReducer
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({thunk : false}), sagaMiddleware ]
});

sagaMiddleware.run(watcherSaga);

export default store;