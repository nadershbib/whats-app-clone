// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import firebase from 'firebase'

  var firebaseConfig = {
    apiKey: "AIzaSyD4yuMdXVMJAxOiFEj9kPsgeEM9A9lSaBY",
    authDomain: "whatsapp-clone-be32a.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-be32a.firebaseio.com",
    projectId: "whatsapp-clone-be32a",
    storageBucket: "whatsapp-clone-be32a.appspot.com",
    messagingSenderId: "1095752348352",
    appId: "1:1095752348352:web:ed282501d884671a973325",
    measurementId: "G-MGYT6MJEQ4"
  };
  // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);

 const db = fire.firestore();
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();

 export default db;
 export {auth,provider};