import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDwQA1VPfatqWKOB_xoen06E6tFa2uuySk",
    authDomain: "rjmemails.firebaseapp.com",
    projectId: "rjmemails",
    storageBucket: "rjmemails.appspot.com",
    messagingSenderId: "840097252914",
    appId: "1:840097252914:web:2724a3016b0df55140de2b",
    measurementId: "G-372ZCW0DVQ"
};

export const app = initializeApp(firebaseConfig);


