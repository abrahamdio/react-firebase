// firebase
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAc2qHLlT5cqeM95XebdbMu56uQj2o4RnA",
    authDomain: "react-firebase-de93b.firebaseapp.com",
    databaseURL: "https://react-firebase-de93b.firebaseio.com",
    projectId: "react-firebase-de93b",
    storageBucket: "react-firebase-de93b.appspot.com",
    messagingSenderId: "781308919093"
};
var fire = firebase.initializeApp(firebaseConfig);
export default fire;