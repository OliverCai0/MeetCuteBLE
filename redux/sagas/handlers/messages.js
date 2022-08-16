import { collection, onSnapshot, query, where } from "firebase/firestore";
import { eventChannel } from "redux-saga";
import { call, cancelled, fork, put, takeEvery } from "redux-saga/effects";
import { firestore } from "../../../firebase";
import { closeChats, setChats, updateChat } from "../../ducks/Chat";
import { createChat, getMessagesForChat } from "../requests/chat";

function messageChannel(action) {
    console.log("Message Channel:", action)
    const chatID = action.payload.chatID
    return eventChannel(emitter => {
        const c = collection(firestore, 'chats', chatID, 'messages')
        const unsub = onSnapshot(c, (querySnapShot) => {
            querySnapShot.docChanges().forEach((change) => {
                if (change.type === 'added'){
                    emitter(change.doc.data())
                }
            })
        })
        return unsub
    })
}

function* listenToMessageChannel(action){
    try{
        const chan = yield call(messageChannel, action)
        fork(listenToClose(chan))
        while(true){
            ```
            r = {
                message : 'Message Here',
                sentBy : 'userID'
            }
            ```
            let r = take(chan)
            yield put(updateChat(r))
        }
    }
    finally{
        if(yield cancelled()){
            chan.close()
        }
    }
}

function* listenToClose(unsub){
    yield take(closeChats.type)
    unsub()
}

function* fetchMessagesAndListen(action){
    const contact = action.payload.contact
    const userID = action.payload.userID
    const lexiographic = userID < contact ? `${userID}:${contact}` : `${contact}:${userID}`
    if(action.payload.firstMessage){
        yield call(createChat, {chatID : lexiographic, userID : userID})
    }
    const messages = yield call(getMessagesForChat,{chatID : lexiographic})
    yield put(setChats({chatID : lexiographic, messages: messages}))
    fork(listenToMessageChannel(chatID))
}

export default function* createMessageChannels(){
    yield takeLatest(getChat.type, fetchMessagesAndListen)
}

