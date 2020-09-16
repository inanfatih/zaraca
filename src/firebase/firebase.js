import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export const firebaseConfig = {
  apiKey: 'AIzaSyDlAfBu8Hrc1rY6ozP5NKcuA0FsZkDP4Fs',
  authDomain: 'zaracastore.firebaseapp.com',
  databaseURL: 'https://zaracastore.firebaseio.com',
  projectId: 'zaracastore',
  storageBucket: 'zaracastore.appspot.com',
  messagingSenderId: '113283454327',
  appId: '1:113283454327:web:4b1457f92f2df7d618fd72',
}

firebase.initializeApp(firebaseConfig)

//Sayfa acik oldugu surece authorized ediyor
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase
