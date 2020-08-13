import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBcvsZMjW33xATN4mrEY2tgjbFTH2y06d4",
    authDomain: "picturesque-4a060.firebaseapp.com",
    databaseURL: "https://picturesque-4a060.firebaseio.com",
    projectId: "picturesque-4a060",
    storageBucket: "picturesque-4a060.appspot.com",
    messagingSenderId: "667225514922",
    appId: "1:667225514922:web:3c06145371c639eb38c1d3"
  };

firebase.initializeApp(firebaseConfig);

const strRef = firebase.storage().ref();

export default strRef;
