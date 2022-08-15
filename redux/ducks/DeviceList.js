import { createSlice } from "@reduxjs/toolkit";

const deviceListSlice = createSlice({
    name: 'deviceList',
    initialState: [],
    reducers: {
        getDeviceList() {},
        setDeviceList(state, action) {
            if (!state.some(d => d.local_name === action.payload.localName)){
                return [...state, 
                    {local_name: action.payload.localName, device_info : action.payload.id, id : state.length, pressed: false}
                ]
            }
            else{
                return state
            }
        },
        stopDeviceListen() {}
    }
});

export const {getDeviceList, setDeviceList, stopDeviceListen} = deviceListSlice.actions;

export default deviceListSlice.reducer;