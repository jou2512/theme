// Utilities
import { make } from 'vuex-pathify'
import firebase from 'firebase/app'
import 'firebase/auth'
import db, { authService } from '../../Firebase/init'
const age = (createdAt) => {
  var startTime = createdAt
  var endTime = firebase.firestore.Timestamp.fromDate(new Date())
  var differenceInSeconds = endTime - startTime
  var age = Math.floor(differenceInSeconds / 31536000)
  console.log(startTime.toDate().getFullYear())
  return age
}
const categorie = (geburtstag) => {
  var year = geburtstag.toDate().getFullYear()
  var thisyear = new Date().getFullYear()
  var date1 = new Date('June 30, ' + thisyear)
  var age = thisyear - year
  console.log(age)
  if (new Date() > date1) {
    if (year > thisyear - 8) {
      return 'Poussins / U8'
    } else if (year > thisyear - 10) {
      return 'Pupilles / U10'
    } else if (year > thisyear - 12) {
      return 'Benjamins / U12'
    } else if (year > thisyear - 14) {
      return 'Minimes / U14'
    } else if (year > thisyear - 17) {
      return 'Cadets / U17'
    } else if (year > thisyear - 20) {
      return 'Junioren / U20'
    } else if (year > thisyear - 45) {
      if (year >= thisyear - 23) {
        return 'Senioren (U23)'
      } else {
        return 'Senioren'
      }
    } else {
      return 'Veteranen'
    }
  } else {
    thisyear--
    if (year > thisyear - 8) {
      return 'Poussins / U8'
    } else if (year > thisyear - 10) {
      return 'Pupilles / U10'
    } else if (year > thisyear - 12) {
      return 'Benjamins / U12'
    } else if (year > thisyear - 14) {
      return 'Minimes / U14'
    } else if (year > thisyear - 17) {
      return 'Cadets / U17'
    } else if (year > thisyear - 20) {
      return 'Junioren / U20'
    } else if (year > thisyear - 45) {
      if (year >= thisyear - 23) {
        return 'Senioren (U23)'
      } else {
        return 'Senioren'
      }
    } else {
      return 'Veteranen'
    }
  }
}
const state = {
  get: 0,
  infos: {
    privat: {
      funktionen: [],
      fechten: false,
      firstName: '',
      nachName: '',
      gender: '',
      geburtsdatum: firebase.firestore.Timestamp.fromDate(new Date('January 1, 2000')),
      auto: false,
    },
    events: {
      eventsBes: 0,
    },
    login: {
      gesperrt: false,
      avatar: '',
      admin: false,
      completed: false,
      email: '',
      telefon: '',
      username: '',
      registriertAm: firebase.firestore.Timestamp.fromDate(new Date('January 1, 2000')),
    },
    kinder: [],
    addresse: {
      strasse: '',
      hausnummer: '',
      ort: '',
      postleitzahl: 0,
    },
  },
  mitglieder: [],
  mitgliederkeineKinder: [],
  events: [],
  turnierausschreibungen: [],
}

const mutations = {
  ...make.mutations(state),
  updateMitglieder (state) {
    const usersCollection = db.collection('users')
    usersCollection.limit(100).get().then((res) => {
      const user = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      for (let i = 0; i < res.docs.length; i++) {
        state.mitglieder[i] = {
          ID: i,
          uid: user[i].id,
          avatar: user[i].login.avatar,
          title: user[i].privat.firstName + ' ' + user[i].privat.nachName,
          funktionen: user[i].privat.funktionen,
          alter: age(user[i].privat.geburtsdatum),
          email: user[i].login.email,
          categorie: categorie(user[i].privat.geburtsdatum),
          geburtstag: user[i].privat.geburtsdatum,
          gesperrt: user[i].login.gesperrt,
        }
      }
    })
  },
  updateEvents (state) {
    const eventsCollection = db.collection('events')
    eventsCollection.get().then((res) => {
      const events = res.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
      for (let i = 0; i < res.docs.length; i++) {
        state.events[i] = { ID: i, ...events[i] }
      }
    })
  },
  updateAllData (state) {
    const cityRef = db.collection('users').doc(authService.user.uid)
    const usersCollection = db.collection('users')
    const eventsCollection = db.collection('events')
    const notificationsCollection = db.collection('notifications')

    const promise1 = cityRef.get()
    const promise2 = usersCollection.limit(100).get()
    const promise3 = eventsCollection.get()
    const promise4 = firebase.storage().ref().child('Turnierausschreibungen').list()
    const promise5 = notificationsCollection.get()

    return Promise.all([promise1, promise2, promise3, promise4, promise5]).then((values) => {
      state.infos = values[0].data()
      this.$store.state.notifications.notifications = values[4].docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const user = values[1].docs.map(doc => ({ id: doc.id, ...doc.data() }))
      for (let i = 0; i < values[1].docs.length; i++) {
        state.mitglieder[i] = {
          ID: i,
          uid: user[i].id,
          avatar: user[i].login.avatar,
          title: user[i].privat.firstName + ' ' + user[i].privat.nachName,
          funktionen: user[i].privat.funktionen,
          alter: age(user[i].privat.geburtsdatum),
          email: user[i].login.email,
          categorie: categorie(user[i].privat.geburtsdatum),
          geburtstag: user[i].privat.geburtsdatum,
          admin: user[i].login.admin,
          gesperrt: user[i].login.gesperrt,
        }
      }
      for (let i = 0; i < values[1].docs.length; i++) {
        if (user[i].login.completed) {
          console.log('id: ', user[i])
          state.mitgliederkeineKinder[state.mitgliederkeineKinder.length] = {
            ID: i,
            uid: user[i].id,
            avatar: user[i].login.avatar,
            title: user[i].privat.firstName + ' ' + user[i].privat.nachName,
            funktionen: user[i].privat.funktionen,
            alter: age(user[i].privat.geburtsdatum),
            email: user[i].login.email,
            categorie: categorie(user[i].privat.geburtsdatum),
            geburtstag: user[i].privat.geburtsdatum,
            admin: user[i].login.admin,
            gesperrt: user[i].login.gesperrt,
          }
        }
      }
      const events = values[2].docs.map(doc => ({ uid: doc.id, ...doc.data() }))
      state.events = []
      console.log(events)
      for (let i = 0; i < values[2].docs.length; i++) {
        state.events[i] = { ID: i, ...events[i] }
      }
      for (let i = 0; i < values[3].items.length; i++) {
        values[3].items[i].getDownloadURL().then((downloadURL) => {
          state.turnierausschreibungen[i] = {
            ID: i,
            title: values[3].items[i].name,
            link: downloadURL,
          }
        })
      }
      console.log(state.turnierausschreibungen)
      console.log(state.events)
      state.get = 1
    })
  },
}

const actions = {
  age ({ state }, createdAt) {
    var startTime = createdAt.createdAt
    var endTime = firebase.firestore.Timestamp.fromDate(new Date())
    var differenceInSeconds = endTime - startTime
    var age = Math.floor(differenceInSeconds / 31536000)
    return age
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
