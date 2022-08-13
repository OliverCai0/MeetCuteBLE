import { configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./ducks/User"
import contactsReducer from "./ducks/Contacts";
import incomingRequestsReducer from "./ducks/IncomingRequests";
import outgoingRequestsReducer from "./ducks/OutgoingRequests";
import deviceListReducer from "./ducks/DeviceList";
import { watcherSaga } from "./sagas/rootSaga";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    user: userReducer,
    contacts : contactsReducer,
    incomingRequests : incomingRequestsReducer,
    outgoingRequests : outgoingRequestsReducer,
    deviceList : deviceListReducer
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({thunk : false}), sagaMiddleware ]
});

sagaMiddleware.run(watcherSaga);

export default store;