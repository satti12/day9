import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWntonW0XvZ3XC4EabqtSKZxFJ7V7YPBU",
  authDomain: "fir-9-409d6.firebaseapp.com",
  databaseURL: "https://fir-9-409d6-default-rtdb.firebaseio.com",
  projectId: "fir-9-409d6",
  storageBucket: "fir-9-409d6.appspot.com",
  messagingSenderId: "165750133412",
  appId: "1:165750133412:web:fb6521d957965fc4630c31"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
