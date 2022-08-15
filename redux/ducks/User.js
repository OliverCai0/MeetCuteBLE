import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../mmkv";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        getUser() {},
        setUser(state, action) {
            const userData = action.payload;
            console.log("Setting user data:", userData)
            storage.set('user', JSON.stringify(userData))
            return {...state, ...userData};
        },
        loginUser() {},
        registerUser() {},
        logoutUser(state, action) {
            return {}
        },
        resetUserData() {}
    }
});

export const {getUser, setUser, loginUser, registerUser, logoutUser, resetUserData} = userSlice.actions;

export default userSlice.reducer;