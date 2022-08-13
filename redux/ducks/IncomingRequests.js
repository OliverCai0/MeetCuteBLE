import { createSlice } from "@reduxjs/toolkit";

const incomingRequestsSlice = createSlice({
    name: 'incomingRequests',
    initialState: [],
    reducers: {
        getIncomingRequests() {},
        setIncomingRequests(state, action) {
            return [...state, action.payload];
        }
    }
});

export const {getIncomingRequests, setIncomingRequests} = incomingRequestsSlice.actions;

export default incomingRequestsSlice.reducer;