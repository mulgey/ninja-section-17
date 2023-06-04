import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBoP9rlXa6oawhjJntJN76K-Hc6PazcBMA",
  authDomain: "theprojectportal.firebaseapp.com",
  projectId: "theprojectportal",
  storageBucket: "theprojectportal.appspot.com",
  messagingSenderId: "602872259926",
  appId: "1:602872259926:web:87d9727bec3b05fb8be2f7"
};

// init firebase
// bizi firebase backend'ine bağlar
firebase.initializeApp(firebaseConfig);

// init services
// firestore hizmetlerini başlatır
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage();

// zaman pulu
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }