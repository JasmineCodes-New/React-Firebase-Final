import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCm5Bcf5mI603Z4WP-9v_bnAgg92QEcyzI",
    authDomain: "jasmine-reactgram.firebaseapp.com",
    projectId: "jasmine-reactgram",
    storageBucket: "jasmine-reactgram.appspot.com",
    messagingSenderId: "24443223188",
    appId: "1:24443223188:web:96b3bb0a3174a68e318881"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timestamp = firebase.firestore.FieldValue.serverTimestamp; 

export { projectStorage, projectFirestore, timestamp };