import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: 'AIzaSyBr2xKsQQzgSxalhoDc1m9xk78M75cNZrk',
    authDomain: 'fechtgesellschaft-1.firebaseapp.com',
    projectId: 'fechtgesellschaft-1',
    storageBucket: 'fechtgesellschaft-1.appspot.com',
    messagingSenderId: '1071586180289',
    appId: '1:1071586180289:web:a6b748ba6986914dbf6840',
    measurementId: 'G-2306MNFECZ',
    databaseURL: 'fechtgesellschaft-1.firebaseio.com',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

const initializeAuth = new Promise(resolve => {
  // this adds a hook for the initial auth-change event
  firebase.auth().onAuthStateChanged(user => {
    authService.setUser(user)
    resolve(user)
    console.log('now')
  })
})

const authService = {
  user: null,
  authenticated () {
      return initializeAuth.then(user => {
        return user
      })
  },
  setUser (user) {
      this.user = user
  },
  login (email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  logout () {
      firebase.auth().signOut().then(() => {
        console.log('logout done')
      })
  },
}

export { timestamp }
export { authService }
export default firebaseApp.firestore()
