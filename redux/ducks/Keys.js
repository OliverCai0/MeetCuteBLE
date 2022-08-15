import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../mmkv";

const keysSlice = createSlice({
    name : "keys",
    initialState: [],
    reducers: {
        getKeys() {},
        setKeys(state, action) {
            console.log('payload', action.payload)
            const updates = action.payload.filter(x => !state.includes(x))
            storage.set('allUsers', 
                JSON.stringify(
                    [...state, ...updates]
                )
            );
            return [...state, ...updates];
        },
        closeKeyChannel() {}
    }
});

export const {getKeys, setKeys, closeKeyChannel} = keysSlice.actions;

export default keysSlice.reducer;