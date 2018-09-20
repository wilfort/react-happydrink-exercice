import firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCtdcSi9_9QX-RmxQd8LZoKRA-UqQ6B5wo",
    authDomain: "bar-becode.firebaseapp.com",
    databaseURL:"https://bar-becode.firebaseio.com",
    projectId: "bar-becode",
    storageBucket: "bar-becode.appspot.com",
    messagingSenderId: "117005497656",
});

export default app;