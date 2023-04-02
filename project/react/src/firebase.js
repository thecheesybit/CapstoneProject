
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC74dTyT8_HrsuSQZq4x60P-ef8k-317Hw",
    authDomain: "realtime-ticketing.firebaseapp.com",
    databaseURL: "https://realtime-ticketing-default-rtdb.firebaseio.com",
    projectId: "realtime-ticketing",
    storageBucket: "realtime-ticketing.appspot.com",
    messagingSenderId: "309260278638",
    appId: "1:309260278638:web:74e03e2d9eb2ee7b3cbf7f"
  };

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;