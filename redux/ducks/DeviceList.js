import { createSlice } from "@reduxjs/toolkit";

const deviceListSlice = createSlice({
    name: 'deviceList',
    initialState: [],
    reducers: {
        getDeviceList() {},
        setDeviceList(state, action) {
            console.log('State', state);
            if (!state.some(d => d?.device_info?.localName === action.payload.localName)){
                return [...state, {device_info : action.payload, id : state.length, pressed: false}]
            }
            else{
                return state
            }
        }
    }
});

export const {getDeviceList, setDeviceList} = deviceListSlice.actions;

export default deviceListSlice.reducer;