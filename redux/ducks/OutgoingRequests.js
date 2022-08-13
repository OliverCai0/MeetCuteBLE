import { createSlice } from "@reduxjs/toolkit";

const outgoingRequestsSlice = createSlice({
    name: 'incomingRequests',
    initialState: [],
    reducers: {
        getOutgoingRequests() {},
        setOutgoingRequests(state, action) {
            return [...state, action.payload];
        }
    }
});

export const {getOutgoingRequests, setOutgoingRequests} = outgoingRequestsSlice.actions;

export default outgoingRequestsSlice.reducer;