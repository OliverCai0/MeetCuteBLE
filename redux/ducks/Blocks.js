import { createSlice } from "@reduxjs/toolkit";

const blocksSlice = createSlice({
    name : "blocks",
    initialState: [],
    reducers: {
        getBlocks() {},
        setBlocks(state, action) {
            return [...state, action.payload];
        },
    }
});

export const {getBlocks, setBlocks} = blocksSlice.actions;

export default blocksSlice.reducer;