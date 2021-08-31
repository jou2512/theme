import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import db from '../Firebase/init'
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
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

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

  const getUsers = () => {
    usersCollection.limit(100).onSnapshot(snapshot => {
      users.value = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .reverse()
    })
  }

  const getInfUser = async (id) => {
    var userData = null
    await db.collection('users').doc(id).get().then((data) => {
      userData = data.data()
    })
    return userData
  }

  onUnmounted(getUsers())

  return { getInfUser }
}

const chatCollection = firestore.collection('messages')

export function useChat () {
  const messages = ref([])
  const chat = ref(null)
  const chattype = ref(null)
  const chats = ref(null)

  const assignChat = chatinfo => {
    console.log('Chatinfo: ', chatinfo)
    var docref = chatCollection.doc(chatinfo)
    docref.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data())
        chattype.value = doc.data().type
        chat.value = chatinfo
        docref.collection('messages').orderBy('createdAt', 'desc').limit(100).onSnapshot(snapshot => {
          messages.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .reverse()
          console.log(messages.value)
        })
      } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
      }
    })
  }
  const getChats = () => {
    console.log(authService.user.uid)
    chatCollection.where('users', 'array-contains', authService.user.uid).orderBy('lastMessage', 'asc').limit(100).onSnapshot(snapshot => {
      console.log('Alle Chats: ', snapshot)
      chats.value = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .reverse()
      console.log('heyyy', chats.value)
      if (!(messages.value.length > 0)) {
        assignChat(chats.value[0].id)
      }
    })
  }

  /*
  const getchattype = chatinfo => {
    var docref = chatCollection.doc(chatinfo)
    docref.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data1:', doc.data())
        chattype.value = doc.data().type
      } else {
          // doc.data() will be undefined in this case
          console.log('No such document 1!')
      }
    })
  }
  */

/*  const unsubscribe = chatQuery.onSnapshot(snapshot => {
    console.log(snapshot)
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })  */
  onUnmounted(getChats())

  const createChat = pars => {
    if (!isLogin.value) return
    const { uid } = user.value
    const users = [uid, pars.uid]
    const type = pars.type
    chatCollection.add({
      avatar: pars.avatar,
      users: users,
      type: type,
      title: pars.title,
      lastMessage: null,
      createdAt: timestamp,
    })
    console.log('created')
  }

  const searchChats = (obj) => {
    const { uid } = user.value
    if (obj.uid === uid) return 0
    if (chats.value) {
      var exists = false
      var i = 0
      while (i < chats.value.length && !exists) {
        const element = chats.value[i].users
        if (element.includes(obj.uid)) {
          exists = true
          return i
        }
        i++
      }
      createChat({ uid: obj.uid, type: 'chat', avatar: obj.avatar, title: obj.title })
      return 0
    } else {
      createChat({ uid: obj.uid, type: 'chat', avatar: obj.avatar, title: obj.title })
      return 0
    }
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

  return { chattype, searchChats, assignChat, messages, chats, sendMessage, createChat }
}

export { timestamp }
export { authService }
export default firebaseApp.firestore()
