// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  defaultroute,
  weboutroute,
} from '@/util/routes'
import 'firebase/auth'
import firebase from 'firebase/app'
import db, { authService } from '../Firebase/init'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      defaultroute('Dashboard'),

      // Pages
      defaultroute('UserProfile', null, 'profile'),

      // Components
      defaultroute('Notifications', null, 'notifications'),
      defaultroute('Icons', null, 'upcoming'),
      defaultroute('Typography', null, 'fahrten'),

      // Tables
      defaultroute('Regular Tables', null, 'kalender'),

      // Maps
      defaultroute('Google Maps', null, 'resultate'),

      defaultroute('Users', null, 'users'),
      defaultroute('Events', null, 'events'),
      defaultroute('Chats', null, 'chats'),
    ]), layout('webout', [
      weboutroute('Start'),
      weboutroute('confirmation', null, 'confirmation/:id'),
    ], '/start'),
  ],
})

router.beforeEach((to, from, next) => {
  const age = (createdAt) => {
    var startTime = createdAt
    var endTime = firebase.firestore.Timestamp.fromDate(new Date())
    var differenceInSeconds = endTime - startTime
    var age = Math.floor(differenceInSeconds / 31536000)
    return age
  }
  const categorie = (geburtstag) => {
    var year = geburtstag.toDate().getFullYear()
    var thisyear = new Date().getFullYear()
    var date1 = new Date('June 30, ' + thisyear)
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
  const calldata = () => {
    const usersCollection = db.collection('users')
    const cityRef = usersCollection.doc(authService.user.uid)
    const eventsCollection = db.collection('events')
    const notificationsCollection = db.collection('notifications')

    const promise1 = cityRef.get()
    const promise2 = usersCollection.limit(100).get()
    const promise3 = eventsCollection.get()
    const promise4 = firebase.storage().ref().child('Turnierausschreibungen').list()
    const promise5 = notificationsCollection.get()

    return Promise.all([promise1, promise2, promise3, promise4, promise5]).then((values) => {
      store.state.userfirebase.infos = values[0].data()
      store.state.notifications.notifications = values[4].docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const user = values[1].docs.map(doc => ({ id: doc.id, ...doc.data() }))
      for (let i = 0; i < values[1].docs.length; i++) {
        store.state.userfirebase.mitglieder[i] = {
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
          store.state.userfirebase.mitgliederkeineKinder[store.state.userfirebase.mitgliederkeineKinder.length] = {
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
      console.log(store.state.userfirebase.mitgliederkeineKinder)
      const events = values[2].docs.map(doc => ({ uid: doc.id, ...doc.data() }))
      for (let i = 0; i < values[2].docs.length; i++) {
        store.state.userfirebase.events[i] = { ID: i, ...events[i] }
      }
      for (let i = 0; i < values[3].items.length; i++) {
        values[3].items[i].getDownloadURL().then((downloadURL) => {
          store.state.userfirebase.turnierausschreibungen[i] = {
            ID: i,
            title: values[3].items[i].name,
            link: downloadURL,
          }
        })
      }
      console.log(store.state.userfirebase.turnierausschreibungen)
      console.log(store.state.userfirebase.events)
      store.state.userfirebase.get = 1
    })
  }
  if (to.path) {
    if (to.path === '/start/confirmation/') {
      next('/start/')
    } else {
      try {
        if (to.matched[1].path === '/start/confirmation/:id') {
          if (to.params.id != null) {
            const cityRef = db.collection('users').doc(to.params.id)
            cityRef.get().then((doc) => {
              if (!doc.exists || doc.data().login.completed) {
                next('/start/')
              } else {
                to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
              }
            })
          } else {
            to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
          }
        } else {
          if (to.path === '/start/') {
            to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
          } else {
            authService.authenticated().then(() => {
              if (authService.user) {
                if (store.state.userfirebase.get === 0) {
                  calldata().then(() => {
                    if (to.path === '/resultate/' || to.path === '/dokumente' | to.path === '/shop' | to.path === '/einstellungen') {
                      next(from.path)
                    } else {
                      to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
                    }
                  })
                } else {
                  if (to.path === '/resultate/' | to.path === '/dokumente' | to.path === '/shop' | to.path === '/einstellungen') {
                    next(from.path)
                  } else {
                    to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
                  }
                }
              } else {
                next('/start/')
              }
            })
            .catch((err) => {
              console.log(err)
            })
          }
        }
      } catch (error) {
        console.log(error)
        if (to.path === '/resultate/' || to.path === '/dokumente' | to.path === '/shop' | to.path === '/einstellungen' | to.path === '/chats') {
          next(from.path)
        } else {
          next('/start/')
        }
      }
    }
  } else {
    next(from.path)
  }
})

export default router
