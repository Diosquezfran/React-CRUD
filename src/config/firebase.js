import firebase from "firebase/app"; 
import "firebase/firestore"; 
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCPjQgHS7A_b1eMdavxyXS8OcfHl-FAWKs",
    authDomain: "crud-react-b5917.firebaseapp.com",
    projectId: "crud-react-b5917",
    storageBucket: "crud-react-b5917.appspot.com",
    messagingSenderId: "365378334607",
    appId: "1:365378334607:web:424aec0119fa2cf4f0e5fa"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();