import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB_spCEL8cE1WdFnhR1S0daic_bh0PJaOQ",
  authDomain: "mettapp-chaos.firebaseapp.com",
  databaseURL: "https://mettapp-chaos.firebaseio.com",
  projectId: "mettapp-chaos",
  storageBucket: "mettapp-chaos.appspot.com",
  messagingSenderId: "367004575386"
  };
firebase.auth.GoogleAuthProvider
firebase.initializeApp(config);

export default firebase;