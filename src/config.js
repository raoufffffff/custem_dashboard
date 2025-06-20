import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAKrXRVwXXE2NQ_iuI-y3S9A6NZTgl9WTk",
    authDomain: "tawssilatrest.firebaseapp.com",
    projectId: "tawssilatrest",
    storageBucket: "tawssilatrest.appspot.com",
    messagingSenderId: "695856286760",
    appId: "1:695856286760:web:698d0c4c4300211de5791d",
    measurementId: "G-QG1QTWXWQY"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


export { firebase }