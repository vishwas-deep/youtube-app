import firebase from 'firebase/app'

import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDL2ciIVKlsrFBJXVJJ-ZhNw04fL4vzCTc",
    authDomain: "metube--app.firebaseapp.com",
    projectId: "metube--app",
    storageBucket: "metube--app.appspot.com",
    messagingSenderId: "154321007591",
    appId: "1:154321007591:web:4d19eb770a140210bb0342"
};

firebase.initializeApp(firebaseConfig)

export default firebase.auth()