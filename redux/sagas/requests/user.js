import { firestore } from "../../../firebase";
import { query, collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import deviceInfoModule from "react-native-device-info";

export function signUpUser(action) {
    const userId = action.payload.id
    const username = action.payload.username
    const email = action.payload.email
    return deviceInfoModule.getUniqueId()
        .then((uniqueID) => {
            console.log('Unique ID:', uniqueID);
            return setDoc(doc(firestore, 'users', userId), {
                email: email,
                username: username,
                bleID: uniqueID,
                uuid: userId,
                blocked: [],
                contacts: []
            })
            .then(() => {
                return getUserData(action)
                // .then((respo) => {
                //     console.log('Response from getUserData: ', respo)
                //     return respo
                // })
            })
        }
    ).catch(
        (error) => {
            console.log("sign up user error:", error);
        }
    )
}

export function getUserData(action) {
    return getDoc(doc(firestore, 'users', action.payload.id ))
    .then((response) => {
        if (response.exists()){
            console.log("Response exists")
            return response.data()
        } else {
            console.log('User does not exist')
            return {}
        }
    })
}

export function grabAllUsers(action) {
    return getDocs(query(collection(firestore, 'users')))
    .then((response) => {
        console.log('grabbed', response.docs[0])
        return response.docs.map((doc) => doc.data())
    })
}