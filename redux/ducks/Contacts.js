import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
    name : "contacts",
    initialState: [],
    reducers: {
        getContacts() {},
        setContacts(state, action) {
            return [...state, action.payload];
        },
    }
});

export const {getContacts, setContacts} = contactsSlice.actions;

export default contactsSlice.reducer;