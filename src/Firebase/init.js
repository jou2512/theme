import firebase from 'firebase/app'
import 'firebase/firestore'
import { ref, onUnmounted, computed } from '@vue/composition-api'

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

const auth = firebase.auth()

const initializeAuth = new Promise(resolve => {
  // this adds a hook for the initial auth-change event
  auth.onAuthStateChanged(user => {
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
      return auth.signInWithEmailAndPassword(email, password)
  },
  logout () {
      auth.signOut().then(() => {
        console.log('logout done')
      })
  },
}

export function useAuth () {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  const isLogin = computed(() => user.value !== null)

  const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const signOut = () => auth.signOut()

  return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()

const usersCollection = firestore.collection('users')
export function useUsers () {
  const users = ref([])
  const items = ref([])

  const getUsers = () => {
    usersCollection.limit(100).onSnapshot(snapshot => {
      users.value = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .reverse()
      for (let i = 0; i < users.value.length; i++) {
        items.value[i] = {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: users.value[i].privat.firstName + ' ' + users.value[i].privat.nachName,
          subtitle: 'today',
          tag: 'person',
        }
      }
    })
  }

  onUnmounted(getUsers())

  return { items }
}

const chatCollection = firestore.collection('messages')

export function useChat () {
  const messages = ref([])
  const chat = ref(null)

  const assignChat = chatinfo => {
    chat.value = chatinfo
    chatCollection.doc(chatinfo).collection('messages').orderBy('createdAt', 'desc').limit(100).onSnapshot(snapshot => {
      messages.value = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .reverse()
    })
    /*
    chatCollection.where('users', 'array-contains', chatinfo[0]).where('type', '==', chatinfo[1]).get().then(result => {
      const e = result.docs[0].id
      chat.value = e
      chatCollection.doc(e).collection('messages').orderBy('createdAt', 'desc').limit(100).onSnapshot(snapshot => {
        messages.value = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .reverse()
      })
    })  */
  }

/*  const unsubscribe = chatQuery.onSnapshot(snapshot => {
    console.log(snapshot)
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })  */
  onUnmounted(assignChat('CwtL7JqwpHWgbgvSYjfX'))

  const createChat = text => {
    if (!isLogin.value) return
    console.log('created')
    const { uid } = user.value
    const users = [uid, uid]
    const type = text.type
    chatCollection.add({
      user: users,
      type: type,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    console.log('yes')
    const { photoURL, uid, displayName } = user.value
    chatCollection.doc(chat.value).collection('messages').add({
      userName: displayName,
      userId: uid,
      userPhotoUrl: photoURL,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  return { assignChat, messages, sendMessage, createChat }
}

export { timestamp }
export { authService }
export default firebaseApp.firestore()
