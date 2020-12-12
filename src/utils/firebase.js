import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyARKCqeadByhKF6LCq4es2wqTKctZrkRmI",
  authDomain: "cleveroadtest-d0f83.firebaseapp.com",
  projectId: "cleveroadtest-d0f83",
  storageBucket: "cleveroadtest-d0f83.appspot.com",
  messagingSenderId: "549284308110",
  appId: "1:549284308110:web:0a187066221aaa4af595df",
  measurementId: "G-S5BLSRG47N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage().ref();