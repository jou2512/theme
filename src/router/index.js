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
  const calldata = () => {
    const cityRef = db.collection('users').doc(authService.user.uid)
    const usersCollection = db.collection('users')

    const promise1 = cityRef.get()
    const promise2 = usersCollection.limit(100).get()

    return Promise.all([promise1, promise2]).then((values) => {
      store.state.userfirebase.infos = values[0].data()
      const user = values[1].docs.map(doc => ({ id: doc.id, ...doc.data() }))
      for (let i = 0; i < values[1].docs.length; i++) {
        store.state.userfirebase.mitglieder[i] = {
          ID: i,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: user[i].privat.firstName + ' ' + user[i].privat.nachName,
          subtitle: 'today',
          email: user[i].login.email,
          tag: 'person',
        }
      }
      store.state.userfirebase.get = 1
    })
  }

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
                  console.log('ndasfsdfasd')
                  to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
                })
              } else {
                to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
              }
            } else {
              next('/start/')
            }
          })
        }
      }
    } catch (error) {
      console.log(error)
      next('/start/')
    }
  }
})

export default router
