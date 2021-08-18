// Utilities
import firebase from 'firebase/app'
import 'firebase/auth'
import { user } from '.'
import db, { authService } from '../../Firebase/init'

const state = {
  get: 0,
  infos: {
    privat: {
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
}

const mutations = {
  updateMitglieder (state) {
    const usersCollection = db.collection('users')
    usersCollection.limit(100).get().then((res) => {
      const user = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      for (let i = 0; i < res.docs.length; i++) {
        state.mitglieder[i] = {
          ID: i,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: user[i].privat.firstName + ' ' + user[i].privat.nachName,
          subtitle: 'today',
          email: user[i].login.email,
          tag: 'person',
        }
      }
    })
  },
  updateUser (state) {

  },
}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
