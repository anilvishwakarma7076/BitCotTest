import firebase from "firebase";
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyD0p4Yfu7rklDmgQfhJpD6KGhxiCpFP6fQ",
  authDomain: "test-63d49.firebaseapp.com",
  databaseURL: "https://test-63d49-default-rtdb.firebaseio.com",
  projectId: "test-63d49",
  storageBucket: "test-63d49.appspot.com",
  messagingSenderId: "413006627276",
  appId: "1:413006627276:web:99ea053e51523a1f2e9d69",
  measurementId: "G-YWL73PKFBQ"
};

firebase.initializeApp(firebaseConfig);
const database= firebase.database();
export default database;


