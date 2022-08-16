import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";

export function getMessagesForChat(action){
    const chatID = action.payload.chatID
    return getDoc(doc(firestore, 'chats', chatID))
    .then((response) => {
        if(response.exists){
            return getDocs(collection(firestore, 'chats', chatID, 'messages'))
                    .then((query) => {
                        return query.docs.map((doc) => doc.data)
                    })
        }
    })
}

export function createChat(action){
    const chatID = action.payload.chatID
    const userID = action.payload.userID
    const message = action.payload.message
    return setDoc(doc(firestore, 'chats', chatID), {
        message : message,
        sentBy : userID
    })
}