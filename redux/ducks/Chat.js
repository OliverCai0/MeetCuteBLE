import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name : "chats",
    initialState: [],
    reducers: {
        getChats() {},
        setChats(state, action) {
            return [...state, action.payload.chat]
        },
        updateChat(state, action) {
            const newMessage = action.payload
            const chatID = action.payload.chatID
            let chats = [...state]
            let index = state.findIndex((x) => x.chatID === chatID)
            let chat = {...state[index]}
            chat.messages = [...chat.messages, newMessage]
            chats[index] = chat
            return [...chats]
        },
        closeChats() {}
    }
});

export const {getChats, setChats, updateChat, closeChats} = chatsSlice.actions;

export default chatsSlice.reducer;