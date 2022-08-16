import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../mmkv";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        getUser() {},
        setUser(state, action) {
            const userData = action.payload;
            storage.set('user', JSON.stringify(userData))
            return {...state, ...userData};
        },
        loginUser() {},
        registerUser() {},
        logoutUser(state, action) {
            return {}
        },
        resetUserData() {},
        addUserContact(state, action) {
            const newContact = action.payload.newContact.local_name
            console.log('New Onact!', newContact)
            return {...state, contacts : [...state.contacts, newContact]}
        },
        addUserBlock() {}
    }
});

export const {addUserContact, addUserBlock, getUser, setUser, loginUser, registerUser, logoutUser, resetUserData} = userSlice.actions;

export default userSlice.reducer;